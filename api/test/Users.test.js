import chai, { AssertionError } from 'chai';
import chatHttp from 'chai-http';
import 'chai/register-should.js';
import app from '../index';

chai.use(chatHttp);
const { expect, assert } = chai;

describe('Testing the Users Endpoint', () => {
    it('It should get all users', done => {
        chai.request(app)
            .get('/api/v1/users')
            .set('Accept', 'application/json')
            .end((error, response) => {
                expect(response.status).to.equal(200);
                done();
            })
    });


})