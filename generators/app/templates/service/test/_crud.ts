#!/usr/bin/env ts-node

import 'reflect-metadata';

export * from '../src/provider';
import { test } from "tap";
import { Container } from 'typedi';
import { IRouterInterface } from '../src/route/routes';
const mongo: any = Container.get('mongo.concreate.factory');
let id: string;

test(`Test create`, (t) => {
    t.plan(5);
    const svc: any = Container.get('server');
    const fastify = svc.server();

    t.tearDown(() => {
        fastify.close();
    });

    mongo
        .connection()
        .then((resp: any) => {

            fastify.inject({
                method: 'POST',
                url: '/create',
                payload: {
                    example: 'test'
                }
            }, (err, response) => {
                id = JSON.parse(response.payload).result.id;

                t.error(err);
                t.strictEqual(response.statusCode, 200);
                t.strictEqual(response.headers['content-type'], 'application/json');
                t.strictEqual(JSON.parse(response.payload).result.example, 'test');
                t.type(JSON.parse(response.payload).result.id, 'string');

                resp.close();
            });

        });
});

test(`Test read`, (t) => {
    t.plan(4);
    const svc: any = Container.get('server');
    const fastify = svc.server();

    t.tearDown(() => fastify.close());

    mongo
        .connection()
        .then((resp: any) => {
            fastify.inject({
                method: 'GET',
                url: '/read/2'
            }, (err, response) => {
                t.error(err)
                t.strictEqual(response.statusCode, 200);
                t.strictEqual(response.headers['content-type'], 'application/json');
                t.type(JSON.parse(response.payload).result, 'object');

                resp.close();
            });

        });
});

test(`Test update`, (t) => {
    t.plan(4);
    const svc: any = Container.get('server');
    const fastify = svc.server();

    t.tearDown(() => fastify.close());

    mongo
        .connection()
        .then((resp: any) => {

            fastify.inject({
                method: 'PUT',
                url: '/update',
                payload: {
                    example: 'test-updated',
                    id: id
                }
            }, (err, response) => {
                t.error(err);
                t.strictEqual(response.statusCode, 200);
                t.strictEqual(response.headers['content-type'], 'application/json');
                t.deepEqual(JSON.parse(response.payload), {
                    result: {
                        example: 'test-updated',
                        id: id
                    }
                });

                resp.close();
            });

        });
});

test(`Test find one`, (t) => {
    t.plan(4);
    const svc: any = Container.get('server');
    const fastify = svc.server();

    t.tearDown(() => fastify.close());

    mongo
        .connection()
        .then((resp: any) => {
            fastify.inject({
                method: 'GET',
                url: `/entity/${id}`,
            }, (err, response) => {

                t.error(err);
                t.strictEqual(response.statusCode, 200);
                t.strictEqual(response.headers['content-type'], 'application/json');
                t.deepEqual(JSON.parse(response.payload), {
                    result: {
                        example: 'test-updated',
                        id: id
                    }
                });

                resp.close();
            });
        });
});


test(`Test delete`, (t) => {
    t.plan(4);
    const svc: any = Container.get('server');
    const fastify = svc.server();

    t.tearDown(() => fastify.close());

    mongo
        .connection()
        .then((resp: any) => {
            fastify.inject({
                method: 'DELETE',
                url: `/delete/${id}`,
            }, (err, response) => {
                t.error(err);
                t.strictEqual(response.statusCode, 200);
                t.strictEqual(response.headers['content-type'], 'application/json');
                t.deepEqual(JSON.parse(response.payload), {
                    result: {
                        id: id
                    }
                });

                resp.close();
            });
        });
});

test(`Test db instance`, (t) => {
    t.plan(1);
    const svc: any = Container.get('server');
    const fastify = svc.server();

    t.tearDown(() => {
        fastify.close();
    });

    mongo
        .connection()
        .then((resp: any) => {

            const mongoConn = mongo.getInstance();
            t.type(mongoConn, 'object');
            resp.close();
        });
});
