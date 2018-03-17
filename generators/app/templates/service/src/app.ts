import * as Fastify from 'fastify';
import * as Fb from 'fastify-formbody';
import * as Sw from 'fastify-swagger';

import { Service } from 'typedi';
import { Router } from './route';
import { IRouterInterface } from './route/routes';
import * as dotenv from 'dotenv';

@Service('server')
export class FastifyServer {
    public fastify: Fastify.FastifyInstance<{}, {}, {}>;

    constructor( @Router() public router: IRouterInterface) {
        /* istanbul ignore else  */
        if (!process.env.CLUSTER) {
            dotenv.config();
        }

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

    public server() {
        return this.fastify;
    }
}  /* istanbul ignore next */
