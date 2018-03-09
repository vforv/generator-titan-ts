#!/usr/bin/env ts-node

import 'reflect-metadata';

export * from '../src/provider';
const { test } = require('tap')
import { Container } from 'typedi';

test(`Test service route`, (t) => {
    t.plan(4);
    const svc: any = Container.get('server');
    const fastify = svc.server();
    
    t.tearDown(() => fastify.close());

    fastify.inject({
        method: 'GET',
        url: '/service/1'
    }, (err, response) => {
        t.error(err)
        t.strictEqual(response.statusCode, 200);
        t.strictEqual(response.headers['content-type'], 'application/json');
        t.deepEqual(JSON.parse(response.payload), {
            result: {
                example: `ID: 1`
            }
        });
    });
});