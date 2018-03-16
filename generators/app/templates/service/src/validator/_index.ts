import * as Joi from 'joi';
import * as j2s from 'joi-to-swagger';

const createValidator = Joi.object().keys({
    example: Joi
        .string()
        .required()
        .description('This can be any string'),
})
    .required()
    .description('Send new object to create');

const updateValidator = Joi.object().keys({
    example: Joi
        .string()
        .required()
        .description('This can be any string'),
    id: Joi
        .string()
        .required()
        .description('Entity id which we want to update'),
})
    .required()
    .description('Send update object');

const readValidator = Joi.object().keys({
    size: Joi
        .string()
        .required()
        .description('Number of entities per page'),
})
    .required()
    .description('List all items with pagination to go to next or prev page add query params next or previous');

const idValidator = Joi.object().keys({
    id: Joi
        .string()
        .required()
        .description('Entity id'),
})
    .required()
    .description('Send entity id');

const response = {
    200: {
        description: 'Successful response',
        type: 'object',
        properties: {
            result: {
                type: 'object',
                properties: {
                    example: { type: 'string' },
                    id: { type: 'string' },
                },
            },
        },
    },
};

const response1 = {
    200: {
        description: 'Successful response',
        type: 'object',
        properties: {
            result: {
                type: 'object',
                properties: {
                    example: { type: 'string' },
                    id: { type: 'string' },
                },
            },
        },
    },
};

const responseList = {
    200: {
        description: 'Successful response',
        type: 'object',
        properties: {
            result: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        example: { type: 'string' },
                        id: { type: 'string' },
                    },
                },
            },
            previous: { type: 'string' },
            next: { type: 'string' },
            hasPrevious: { type: 'boolean' },
            hasNext: { type: 'boolean' },
        },
    },
};

export const <%= serviceValidatorConst %>_CREATE_VALIDATOR = {
    schema: {
        body: j2s(createValidator).swagger,
        response,
    },
};

export const <%= serviceValidatorConst %>_UPDATE_VALIDATOR = {
    schema: {
        body: j2s(updateValidator).swagger,
        response,
    },
};

export const <%= serviceValidatorConst %>_READ_VALIDATOR = {
    schema: {
        params: j2s(readValidator).swagger,
        response: responseList,
    },
};

export const <%= serviceValidatorConst %>_ID_VALIDATOR = {
    schema: {
        params: j2s(idValidator).swagger,
        response: response1,
    },
};
