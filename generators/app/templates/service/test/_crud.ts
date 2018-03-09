#!/usr/bin/env ts-node

import 'reflect-metadata';

export * from '../src/provider';
const { test } = require('tap')
import { Container } from 'typedi';
import { readOneLogic } from '../src/logic/read-one.logic';
import { FastifyServer } from '.';
import { IRouterInterface } from '../src/route/routes';

test(`Test readOne`, (t) => {
    t.plan(1);
    t.deepEqual(readOneLogic("test123"), {
        result: {
            example: 'param: test123'
        }
    });
});

test(`Test create`, (t) => {
    t.plan(4);
    const svc: any = Container.get('server');
    const fastify = svc.server();

    t.tearDown(() => fastify.close());

    fastify.inject({
        method: 'POST',
        url: '/create',
        payload: {
            example: 'test'
        }
    }, (err, response) => {
        t.error(err)
        t.strictEqual(response.statusCode, 200);
        t.strictEqual(response.headers['content-type'], 'application/json');
        t.deepEqual(JSON.parse(response.payload), {
            result: {
                example: 'test'
            }
        });
    });
});

test(`Test read`, (t) => {
    t.plan(4);
    const svc: any = Container.get('server');
    const fastify = svc.server();

    t.tearDown(() => fastify.close());

    fastify.inject({
        method: 'GET',
        url: '/read/2/1'
    }, (err, response) => {
        t.error(err)
        t.strictEqual(response.statusCode, 200);
        t.strictEqual(response.headers['content-type'], 'application/json');
        t.deepEqual(JSON.parse(response.payload), {
            result: [{
                example: 'from: 2 size: 1'
            }]
        });
    });
});

test(`Test update`, (t) => {
    t.plan(4);
    const svc: any = Container.get('server');
    const fastify = svc.server();

    t.tearDown(() => fastify.close());

    fastify.inject({
        method: 'PUT',
        url: '/update',
        payload: {
            example: 'test',
            id: 'someid'
        }
    }, (err, response) => {
        t.error(err);
        t.strictEqual(response.statusCode, 200);
        t.strictEqual(response.headers['content-type'], 'application/json');
        t.deepEqual(JSON.parse(response.payload), {
            result: {
                example: 'test',
                id: 'someid'
            }
        });
    });
});

test(`Test update`, (t) => {
    t.plan(4);
    const svc: any = Container.get('server');
    const fastify = svc.server();

    t.tearDown(() => fastify.close());

    fastify.inject({
        method: 'DELETE',
        url: '/delete/1',
        payload: {
            id: 'someid'
        }
    }, (err, response) => {
        t.error(err);
        t.strictEqual(response.statusCode, 200);
        t.strictEqual(response.headers['content-type'], 'application/json');
        t.deepEqual(JSON.parse(response.payload), {
            result: {
                example: "param: 1"
            }
        });
    });
});
