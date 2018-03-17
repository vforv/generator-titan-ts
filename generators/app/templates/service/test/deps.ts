import 'reflect-metadata';
export * from '../src/provider';

import * as mocha from 'mocha';
import { Container } from 'typedi';
import { IAbstractDbFactory } from '../src/model/infrastructure/db';

export const mongo: IAbstractDbFactory<any> = Container.get('mongo.concreate.factory');

const svc: any = Container.get('server');

export const FASTIFY = svc;

export const CONNECTION = mongo
    .connection(
    process.env.MONGO_HOST_TEST,
    process.env.MONGO_USERNAME_TEST,
    process.env.MONGO_PASSWORD_TEST,
);



export let fastify: any;


before((done) => {
    CONNECTION
        .then(() => {
            console.log('DB connected!');
            fastify = svc.server();
            done();
        })
        .catch((err) => {
            console.log(err)
        })
})


after((done) => {
    fastify.close();

    CONNECTION
        .then((resp) => {
            resp.close();
            done();
        })
        .catch((err) => {
            console.log(err)
        })
})