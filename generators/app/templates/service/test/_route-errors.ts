#!/usr/bin/env ts-node

import 'reflect-metadata';
export * from '../src/provider';
import { Container } from 'typedi';
import { test } from 'tap';


class FakeLogic {
    public create(model: any): any {

        return Promise.reject({
            error: "this is error"
        });
    }

    public read(from: number, size: number): any {

        return Promise.reject({
            error: "this is error"
        });
    }

    public readOne(id: string): any {

        return Promise.reject({
            error: "this is error"
        });
    }

    public update(id: string, model: any): any {

        return Promise.reject({
            error: "this is error"
        });
    }

    public delete(modelId: string): any {

        return Promise.reject({
            error: "this is error"
        });
    }
}

test(`Test error callback`, (t) => {
    t.plan(15);
    const svc: any = Container.get('server');
    const fastify = svc.server();

    t.tearDown(() => fastify.close());

    Container.set([
        { id: "ping.logic", value: new FakeLogic() },
    ]);

    fastify.inject({
        method: 'GET',
        url: `/entity/132`,
    }, (err, response) => {
        t.error(err);
        t.strictEqual(response.statusCode, 500);
        t.strictEqual(response.headers['content-type'], 'application/json');
    });

    fastify.inject({
        method: 'POST',
        url: '/create',
        payload: {
            example: 'test'
        }
    }, (err, response) => {
        t.error(err);
        t.strictEqual(response.statusCode, 500);
        t.strictEqual(response.headers['content-type'], 'application/json');
    });

    fastify.inject({
        method: 'GET',
        url: '/read/2/1'
    }, (err, response) => {
        t.error(err);
        t.strictEqual(response.statusCode, 500);
        t.strictEqual(response.headers['content-type'], 'application/json');
    });

    fastify.inject({
        method: 'PUT',
        url: '/update',
        payload: {
            example: 'test-updated',
            id: 'id'
        }
    }, (err, response) => {
        t.error(err);
        t.strictEqual(response.statusCode, 500);
        t.strictEqual(response.headers['content-type'], 'application/json');
    });

    fastify.inject({
        method: 'DELETE',
        url: `/delete/123`,
    }, (err, response) => {
        t.error(err);
        t.strictEqual(response.statusCode, 500);
        t.strictEqual(response.headers['content-type'], 'application/json');
    });
});
