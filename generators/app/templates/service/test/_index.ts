import * as deps from './deps';
import * as chai from 'chai';

const expect = chai.expect;
const assert = chai.assert;

it(`Test service route`, (done) => {

    deps.fastify.inject({
        method: 'GET',
        url: '/service/1'
    }, (err, response) => {
        assert.strictEqual(response.statusCode, 200);
        assert.strictEqual(response.headers['content-type'], 'application/json');
        assert.deepEqual(JSON.parse(response.payload), {
            result: {
                example: `ID: 1`
            }
        });

        done();
    });
});