import * as Fastify from 'fastify';
import * as Fb from 'fastify-formbody';
import * as Sw from 'fastify-swagger';
import * as Pino from 'pino';

import { Service } from 'typedi';
import { Router } from './route';
import { IRouterInterface } from './route/routes';
import * as doc from './doc';

@Service('server')
export class FastifyServer {
    public fastify: Fastify.FastifyInstance<{}, {}, {}>;

    constructor(@Router() public router: IRouterInterface) {
        this.fastify = Fastify();

        // Register plugins
        this.fastify.register(Fb);
        this.fastify.register(Sw, {
            swagger: {
                info: {
                    title: 'Titan <%= serviceFullName %> Service',
                    description: '<%= serviceDesc %>',
                    version: '1.0.0',
                },
                host: 'localhost',
                schemes: ['http'],
                consumes: ['application/json'],
                produces: ['application/json'],
            },
            exposeRoute: true,
        });

        // Register routes
        this.router.registerRoutes(this.fastify);
    }

    public startServer() {
        this.fastify.listen(3030, (error) => {
            if (error) {
                throw error;
            }

            doc.doc();

            const port: any = this.fastify.server;
            Pino().info(`Server listening on port ${port.address().port}.`);
        });
    }
}
