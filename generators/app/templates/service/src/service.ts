import "reflect-metadata";

export * from "./logic";

import * as Fastify from "fastify";
import * as Fb from "fastify-formbody";
import * as Pino from "pino";

import { Container, Service } from "typedi";
import { Router } from "./route";
import { IRouterInterface } from "./route/routes";

@Service("server")
export class FastifyServer {
    public fastify: Fastify.FastifyInstance<{}, {}, {}>;

    constructor(@Router() public router: IRouterInterface) {
        this.fastify = Fastify();

        // Register plugins
        this.fastify.register(Fb);

        // Register routes
        this.router.compareData(this.fastify);
    }

    public startServer() {
        this.fastify.listen(3030, (error) => {
            if (error) {
                throw error;
            }
            const port: any = this.fastify.server;
            Pino().info(`Server listening on port ${port.address().port}.`);
        });
    }
}

const server: any = Container.get("server");
server.startServer();
