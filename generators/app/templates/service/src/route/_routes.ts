import * as Fastify from 'fastify';
import { Container } from 'typedi';
import * as validator from '../validator';
import { ICRUD } from '../model/infrastructure/crud';
import {I<%= serviceCC %>DataModel} from '../model/data/<%= serviceName %>-data.model';
import * as error from 'http-errors';

export interface IRouterInterface {

    registerRoutes(server: Fastify.FastifyInstance<{}, {}, {}>): void;

}

export class RouterRoute implements IRouterInterface {

    public registerRoutes(server: Fastify.FastifyInstance<{}, {}, {}>) {
        this.read(server);
        this.craete(server);
        this.update(server);
        this.delete(server);
        this.readOne(server);
    }

    private craete(server: Fastify.FastifyInstance<{}, {}, {}>) {
        server.post('/create', validator.<%= serviceValidatorConst %>_CREATE_VALIDATOR, (request, reply) => {
            const logic = Container.get<ICRUD<I<%= serviceCC %>DataModel>>('<%= serviceName %>.logic');

            logic.create(request.body)
                .then((result) => {
                    reply.send(result);
                })
                .catch((err: any) => {
                    reply.send(new error.InternalServerError());
                });
        });
    }

    private read(server: Fastify.FastifyInstance<{}, {}, {}>) {
        server.get('/read/:size', validator.<%= serviceValidatorConst %>_READ_VALIDATOR, (request, reply) => {
            const logic = Container.get<ICRUD<I<%= serviceCC %>DataModel>>('<%= serviceName %>.logic');

            logic.read(parseInt(request.params.size, 10), request.query.next, request.query.previous)
                .then((result) => {
                    reply.send(result);
                })
                .catch((err: any) => {
                    reply.send(new error.InternalServerError());
                });
        });
    }

    private readOne(server: Fastify.FastifyInstance<{}, {}, {}>) {
        server.get('/entity/:id', validator.<%= serviceValidatorConst %>_ID_VALIDATOR, (request, reply) => {
            const logic = Container.get<ICRUD<I<%= serviceCC %>DataModel>>('<%= serviceName %>.logic');

            logic.readOne(request.params.id)
                .then((result) => {
                    reply.send(result);
                })
                .catch((err: any) => {
                    reply.send(new error.InternalServerError());
                });
        });
    }

    private update(server: Fastify.FastifyInstance<{}, {}, {}>) {
        server.put('/update', validator.<%= serviceValidatorConst %>_UPDATE_VALIDATOR, (request, reply) => {
            const logic = Container.get<ICRUD<I<%= serviceCC %>DataModel>>('<%= serviceName %>.logic');

            logic.update(request.body.id, { example: request.body.example })
                .then((result) => {
                    reply.send(result);
                })
                .catch((err: any) => {
                    reply.send(new error.InternalServerError());
                });
        });
    }

    private delete(server: Fastify.FastifyInstance<{}, {}, {}>) {
        server.delete('/delete/:id', validator.<%= serviceValidatorConst %>_ID_VALIDATOR, (request, reply) => {
            const logic = Container.get<ICRUD<I<%= serviceCC %>DataModel>>('<%= serviceName %>.logic');

            logic.delete(request.params.id)
                .then((result) => {
                    reply.send(result);
                })
                .catch((err: any) => {
                    reply.send(new error.InternalServerError());
                });
        });
    }
}
