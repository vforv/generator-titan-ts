import 'reflect-metadata';

export * from './provider';
import * as bootprintOpenapi from 'bootprint-openapi';
import * as bootprint from 'bootprint';
import { Container } from 'typedi';

const svc: any = Container.get('server');
const fastify = svc.server();

export function doc() {
    fastify.listen(3031, (error: any) => {
        if (error) {
            throw error;
        }

        bootprint
            .load(bootprintOpenapi)
            .merge({})
            .build('http://localhost:3031/documentation/json', 'doc')
            .generate()
            .done(() => {
                fastify.close();
            });
    });

}

doc();
