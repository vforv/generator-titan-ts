import * as Fastify from 'fastify';
import { Container } from 'typedi';
import * as validator from '../validator';
import { I<%= serviceCC %>Repository } from '../model/infrastructure/service';

export interface IRouterInterface {

    registerRoutes(server: Fastify.FastifyInstance<{}, {}, {}>): void;

}

export class RouterRoute implements IRouterInterface {

    public registerRoutes(server: Fastify.FastifyInstance<{}, {}, {}>) {
        this.service(server);
    }

    private service(server: Fastify.FastifyInstance<{}, {}, {}>) {
        server.get('/service/:id', validator.<%= serviceValidatorConst %>_ID_VALIDATOR, (request, reply) => {
            const logic = Container.get<I<%= serviceCC %>Repository>('<%= serviceName %>.logic');

            logic.serviceMethod(request.params.id)
                .then((result) => {
                    return reply.send(result);
                });
        });
    }
}
