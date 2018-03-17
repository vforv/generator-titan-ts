import * as deps from './deps';
import * as chai from 'chai';

const expect = chai.expect;
const assert = chai.assert;

let id: string;

describe('CRUD', () => {
   
    it(`Test read`, (done) => {
        deps.fastify.inject({
            method: 'GET',
            url: '/read/2'
        }, (err, response) => {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it(`Test create`, (done) => {
        deps.fastify.inject({
            method: 'POST',
            url: '/create',
            payload: {
                example: 'test'
            }
        }, (err, response) => {
            id = JSON.parse(response.payload).result.id;
            expect(JSON.parse(response.payload).result.example).to.be.equals('test');

            done();
        });
    });

    

    it(`Test update`, (done) => {
        deps.fastify.inject({
            method: 'PUT',
            url: '/update',
            payload: {
                example: 'test-updated',
                id: id
            }
        }, (err, response) => {
            expect(response.statusCode).to.equal(200);
            expect(response.headers['content-type']).to.equal('application/json');
            assert.deepEqual(JSON.parse(response.payload), {
                result: {
                    example: 'test-updated',
                    id: id
                }
            });

            done();
        });
    });

    it(`Test find one`, (done) => {
        deps.fastify.inject({
            method: 'GET',
            url: `/entity/${id}`,
        }, (err, response) => {

            expect(response.statusCode).to.equal(200);
            expect(response.headers['content-type']).to.equal('application/json');
            assert.deepEqual(JSON.parse(response.payload), {
                result: {
                    example: 'test-updated',
                    id: id
                }
            });

            done();
        });
    });


    it(`Test delete`, (done) => {
        deps.fastify.inject({
            method: 'DELETE',
            url: `/delete/${id}`,
        }, (err, response) => {
            expect(response.statusCode).to.equal(200);
            expect(response.headers['content-type']).to.equal('application/json');
            assert.deepEqual(JSON.parse(response.payload), {
                result: {
                    id: id
                }
            });

            done();
        });
    });

    it(`Test db instance`, (done) => {

        const mongoConn = deps.mongo.getInstance();
        assert.isObject(mongoConn);
        done();
    });


})
