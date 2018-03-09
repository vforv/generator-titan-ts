import 'reflect-metadata';

export * from './provider';

import { Container } from 'typedi';
import * as Pino from 'pino';

const server: any = Container.get('server');

const fastify = server.server();

fastify.listen(3030, (error: any) => {
    if (error) {
        throw error;
    }

    const port: any = fastify.server;
    Pino().info(`Server listening on port ${port.address().port}.`);
});
