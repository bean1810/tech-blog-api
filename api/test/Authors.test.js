import chai from 'chai';
import chatHttp from 'chai-http';
import 'chai/register-should.js';
import app from '../index';

chai.use(chatHttp);
const { expect } = chai;

describe('Testing the Authors endpoint', () => {
    it('It should create an author', (done) => {
        const author = {
            author_id: 1,
            first_name: 'Dung',
            last_name: 'Tran',
            artist_name: 'Mr.Bean'
        }
        chai.request(app)
            .post('/api/v1/authors')
            .set('Accept', 'application/json')
            .send(author)
            .end((error, response) => {
                expect(response.status).to.equal(201);
                expect(response.body.data).to.include({
                    author_id: author.author_id,
                    first_name: author.first_name,
                    last_name: author.last_name,
                    artist_name: author.artist_name
                })
                done();
            })
    });

    it('It should not create an author with null data', done => {
        const author = {
            author_id: 2,
            first_name: null,
            last_name: 'Tran',
            artist_name: 'Bean'
        }
        chai.request(app)
            .post('/api/v1/authors')
            .set('Accept', 'application/json')
            .send(author)
            .end((error, response) => {
                expect(response.status).to.equal(400);
                expect(response.body.message).to.be.a('string');
                expect(response.body.message).to.equal('Please provide complete details')
                done();
            })
    });

    it('It should update an author if author exist', done => {
        const author = {
            author_id: 1,
            first_name: 'Dung',
            last_name: 'Tran',
            artist_name: 'Bean'
        }
        chai.request(app)
            .post('/api/v1/authors')
            .set('Accept', 'application/json')
            .send(author)
            .end((error, response) => {
                expect(response.status).to.equal(200);
                expect(response.body.message).to.be.a('string');
                expect(response.body.message).to.equal('Author updated')
                done();
            })
    });
})