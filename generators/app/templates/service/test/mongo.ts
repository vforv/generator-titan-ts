#!/usr/bin/env ts-node

import 'reflect-metadata';

import * as dotenv from 'dotenv';
export * from '../src/provider';
import { test } from "tap";
import { Container } from 'typedi';
import { IAbstractDbFactory } from '../src/model/infrastructure/db';
import { MongoFactory } from '../src/db/mongo/mongo.factory';
const mongo: IAbstractDbFactory<any> = Container.get('mongo.concreate.factory');
let id: string;
dotenv.config({ path: '.env-test' });

test(`Mongo create`, (t) => {
    t.plan(2);

    mongo
        .connection()
        .then((resp: any) => {

            const query = mongo.create('example', { example: 'test' });
            query.then((response) => {
                id = response.result.id;

                t.strictEqual(response.result.example, 'test');
                t.type(id, 'object');
                resp.close();
            })
        });
});

test(`Mongo read`, (t) => {
    t.plan(1);

    mongo
        .connection()
        .then((resp: any) => {

            const query = mongo.find('example', {}, 2);
            query.then((response: any) => {
                t.type(response.result, 'object');

                resp.close();
            })
        });
});

test(`Mongo next or prev`, (t) => {
    t.plan(2);
    const mongoFactory: any = new MongoFactory();
    const newObj = mongoFactory.nextOrPrev({}, 'test', null);
    t.strictEqual(newObj.previous, 'test');
    const newObj1 = mongoFactory.nextOrPrev({}, null, 'test');
    t.strictEqual(newObj1.next, 'test');
});

test(`Mongo update`, (t) => {
    t.plan(2);

    mongo
        .connection()
        .then((resp: any) => {

            const query = mongo.update('example', id, { example: 'test123-updated' });
            query.then((response) => {

                t.strictEqual(response.result.example, 'test123-updated');
                t.type(response.result.id, 'object');
                resp.close();
            })
        });
});

test(`Mongo find one`, (t) => {
    t.plan(2);

    mongo
        .connection()
        .then((resp: any) => {

            const query = mongo.findOne('example', id);
            query.then((response) => {

                t.strictEqual(response.result.example, 'test123-updated');
                t.type(response.result.id, 'object');
                resp.close();
            })
        });
});


test(`Mongo delete`, (t) => {
    t.plan(1);

    mongo
        .connection()
        .then((resp: any) => {

            const query = mongo.delete('example', id);
            query.then((response) => {

                t.type(response.result.id, 'object');
                resp.close();
            })
        });
});

test(`Mongo return db instance`, (t) => {
    t.plan(1);

    mongo
        .connection()
        .then((resp: any) => {

            const mongoConn = mongo.getInstance();
            t.type(mongoConn, 'object');
            resp.close();
        });
});
