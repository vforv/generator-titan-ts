import 'reflect-metadata';

export * from './provider';

import { Container } from 'typedi';
import * as Pino from 'pino';

const server: any = Container.get('server');
const db: any = Container.get('mongo.concreate.factory');
const fastify = server.server();

fastify.listen(process.env.PORT, (error: any) => {
    if (error) {
        throw error;
    }

    /**
     * Remove this if you are not using database.
     */
    db
        .connection()
        .then((resp: any) => {
            Pino().info(`DB connected.`);
        })
        .catch((err: any) => {
            Pino().info(err);
        });

    const port: any = fastify.server;
    Pino().info(`Server listening on port ${port.address().port}.`);
});
