import * as Fastify from "fastify";
import * as Joi from "joi";
import { Container } from "typedi";
import { ICompareDates } from "../logic/compare-dates.logic";

export interface IRouterInterface {

    compareData(server: Fastify.FastifyInstance<{}, {}, {}>): void;

}

export class RouterRoute implements IRouterInterface {

    public compareData(server: Fastify.FastifyInstance<{}, {}, {}>) {
        server.post("/data", {
            schema: {
                body: Joi.object({
                    left: Joi.number().required(),
                    right: Joi.number().required(),
                }).required(),
            },
            schemaCompiler: (schema) => (data: any) => Joi.validate(data, schema),
        }, (request, reply) => {
            const cdLogic = Container.get<ICompareDates>("compare-dates.logic");

            reply.send({ msg: cdLogic.compare() });
        });
    }

}
