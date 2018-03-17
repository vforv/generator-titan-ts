import 'reflect-metadata';

export * from './provider';

import { Container } from 'typedi';
import * as Pino from 'pino';

const server: any = Container.get('server');
const db: any = Container.get('mongo.concreate.factory');
const fastify = server.server();

db
    .connection(
    process.env.MONGO_HOST_DEV,
    process.env.MONGO_USERNAME_DEV,
    process.env.MONGO_PASSWORD_DEV,
    )
    .then((resp: any) => {
        /**
         * Leave just fastify.listen if you are not using database.
         */
        fastify.listen(process.env.PORT, (error: any) => {
            if (error) {
                throw error;
            }

            const port: any = fastify.server;
            Pino().info(`Server listening on port ${port.address().port}.`);
            Pino().info(`DB connected.`);
        });
    })
    .catch((err: any) => {
        Pino().info(err);
    });
