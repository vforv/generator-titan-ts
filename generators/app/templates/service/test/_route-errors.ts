import * as deps from './deps';
import { Container } from 'typedi';
import * as chai from 'chai';

const expect = chai.expect;
const assert = chai.assert;

class FakeLogic {
    public create(model: any): any {

        return Promise.reject({
            error: "this is error"
        });
    }

    public read(from: number, size: number): any {

        return Promise.reject({
            error: "this is error"
        });
    }

    public readOne(id: string): any {

        return Promise.reject({
            error: "this is error"
        });
    }

    public update(id: string, model: any): any {

        return Promise.reject({
            error: "this is error"
        });
    }

    public delete(modelId: string): any {

        return Promise.reject({
            error: "this is error"
        });
    }
}
describe('Errors routes', () => {
    it(`Test error callback`, (done) => {

        Container.set([
            { id: '<%= serviceName %>.logic', value: new FakeLogic() },
        ]);

        deps.fastify.inject({
            method: 'GET',
            url: `/entity/132`,
        }, (err, response) => {
            assert.strictEqual(response.statusCode, 500);
            assert.strictEqual(response.headers['content-type'], 'application/json');
        });

        deps.fastify.inject({
            method: 'POST',
            url: '/create',
            payload: {
                example: 'test'
            }
        }, (err, response) => {
            assert.strictEqual(response.statusCode, 500);
            assert.strictEqual(response.headers['content-type'], 'application/json');
        });

        deps.fastify.inject({
            method: 'GET',
            url: '/read/2'
        }, (err, response) => {
            assert.strictEqual(response.statusCode, 500);
            assert.strictEqual(response.headers['content-type'], 'application/json');
        });

        deps.fastify.inject({
            method: 'PUT',
            url: '/update',
            payload: {
                example: 'test-updated',
                id: 'id'
            }
        }, (err, response) => {
            assert.strictEqual(response.statusCode, 500);
            assert.strictEqual(response.headers['content-type'], 'application/json');
        });

        deps.fastify.inject({
            method: 'DELETE',
            url: `/delete/123`,
        }, (err, response) => {
            assert.strictEqual(response.statusCode, 500);
            assert.strictEqual(response.headers['content-type'], 'application/json');
            done();
        });
    });

})
