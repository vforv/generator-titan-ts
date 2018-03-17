import * as deps from './deps';
import { MongoFactory } from '../src/db/mongo/mongo.factory';
import * as chai from 'chai';

const expect = chai.expect;
const assert = chai.assert;
const fastify = deps.FASTIFY;

let id: string;

describe('Mongo factory test', () => {

    it(`Mongo create`, (done) => {
        const query = deps.mongo.create('example', { example: 'test' });
        query.then((response) => {
            id = response.result.id;

            assert.strictEqual(response.result.example, 'test');
            assert.isObject(id);
            done();
        })
    });

    it(`Mongo read`, (done) => {

        const query = deps.mongo.find('example', {}, 2);
        query.then((response: any) => {
            
            assert.isArray(response.result);
            done();
        })
    });

    it(`Mongo next or prev`, (done) => {
        const mongoFactory: any = new MongoFactory();
        
        const newObj = mongoFactory.nextOrPrev({}, 'test', null);
        assert.strictEqual(newObj.previous, 'test');
        const newObj1 = mongoFactory.nextOrPrev({}, null, 'test');
        assert.strictEqual(newObj1.next, 'test');
        done();
    });

    it(`Mongo update`, (done) => {
        const query = deps.mongo.update('example', id, { example: 'test123-updated' });
        query.then((response) => {

            assert.strictEqual(response.result.example, 'test123-updated');
            assert.isObject(response.result.id);
            done();
        })
    });

    it(`Mongo find one`, (done) => {

        const query = deps.mongo.findOne('example', id);
        query.then((response) => {

            assert.strictEqual(response.result.example, 'test123-updated');
            assert.isObject(response.result.id);
            done();
        })
    });

    it(`Mongo delete`, (done) => {

        const query = deps.mongo.delete('example', id);
        query.then((response) => {

            assert.isObject(response.result.id);
            done();
        })
    });

    it(`Mongo return db instance`, (done) => {
        const mongoConn = deps.mongo.getInstance();
        assert.isObject(mongoConn);
        done();
    });

});
