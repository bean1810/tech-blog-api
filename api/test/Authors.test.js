import chai, { AssertionError } from 'chai';
import chatHttp from 'chai-http';
import 'chai/register-should.js';
import app from '../index';

chai.use(chatHttp);
const { expect, assert } = chai;

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
            first_name: 'Dung1810',
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

    it('It should get all author', done => {
        chai.request(app)
            .get('/api/v1/authors')
            .set('Accept', 'application/json')
            .end((error, response) => {
                expect(response.status).to.equal(200);
                expect(response.body.message).to.be.a('string');
                expect(response.body.message).to.equal('Authors retrieved')
                expect(response.body.data).to.have.length(1);
                done();
            })
    })

    it('It should get one author', done => {
        chai.request(app)
            .get('/api/v1/authors/1')
            .set('Accept', 'application/json')
            .end((error, response) => {
                expect(response.status).to.equal(200);
                expect(response.body.message).to.be.a('string');
                expect(response.body.message).to.equal('Found Author');
                done();
            })
    });

    it('It cannot get one author because NaN input', done => {
        chai.request(app)
            .get('/api/v1/authors/a')
            .set('Accept', 'application/json')
            .end((error, response) => {
                expect(response.status).to.equal(400);
                expect(response.body.message).to.be.a('string');
                expect(response.body.message).to.equal('Please input a valid numeric value');
                done();
            })
    });

    it('It cannot get one author who non-existing', done => {
        chai.request(app)
            .get('/api/v1/authors/999')
            .set('Accept', 'application/json')
            .end((error, response) => {
                expect(response.status).to.equal(404);
                expect(response.body.message).to.be.a('string');
                expect(response.body.message).to.equal(`Cannot find Author with the author_id 999`);
                done();
            })
    })

    it('It should update an existing author', done => {
        const author_id = 1;
        const author = {
            author_id: author_id,
            first_name: 'Dung95',
            last_name: 'Tran',
            artist_name: 'Bean'
        };
        chai.request(app)
            .put(`/api/v1/authors/${author_id}`)
            .set('Accept', 'application/json')
            .send(author)
            .end((error, response) => {
                expect(response.status).to.equal(200);
                expect(response.body.message).to.be.a('string');
                expect(response.body.message).to.equal('Author updated')
                done();
            })
    });

    it('It should not update an author because NaN input', done => {
        const author = {
            author_id: 'a',
            first_name: 'Dung181095',
            last_name: 'Tran',
            artist_name: 'Bean'
        };
        chai.request(app)
            .put(`/api/v1/authors/a`)
            .set('Accept', 'application/json')
            .send(author)
            .end((error, response) => {
                expect(response.status).to.equal(400);
                expect(response.body.message).to.be.a('string');
                expect(response.body.message).to.equal('Please input a valid numeric value')
                done();
            })
    });

    it('It should not update an non-existing author', done => {
        const author = {
            author_id: 999,
            first_name: 'Dung181095',
            last_name: 'Tran',
            artist_name: 'Bean'
        };
        chai.request(app)
            .put(`/api/v1/authors/${author.author_id}`)
            .set('Accept', 'application/json')
            .send(author)
            .end((error, response) => {
                expect(response.status).to.equal(404);
                expect(response.body.message).to.be.a('string');
                expect(response.body.message).to.equal(`Cannot find Author with the author_id: ${author.author_id}`)
                done();
            })
    });

    it('It should not delete an author because NaN input', done => {
        const author_id = 'a';
        chai.request(app)
            .delete(`/api/v1/authors/${author_id}`)
            .set('Accept', 'application/json')
            .end((error, response) => {
                expect(response.status).to.equal(400);
                expect(response.body.message).to.be.a('string');
                expect(response.body.message).to.equal('Please provide a numeric value')
                done();
            })
    });

    it('It should not delete an non-existing author', done => {
        const author_id = 999;
        chai.request(app)
            .delete(`/api/v1/authors/${author_id}`)
            .set('Accept', 'application/json')
            .end((error, response) => {
                expect(response.status).to.equal(404);
                expect(response.body.message).to.be.a('string');
                expect(response.body.message).to.equal(`Author with the author_id ${author_id} cannot be found`)
                done();
            })
    });

    it('It should delete an author', done => {
        const author_id = 1;
        chai.request(app)
            .delete(`/api/v1/authors/${author_id}`)
            .set('Accept', 'application/json')
            .end((error, response) => {
                expect(response.status).to.equal(200);
                expect(response.body.message).to.be.a('string');
                expect(response.body.message).to.equal('Author deleted')
                done();
            })
    });

    it('It should get all author but no author found', done => {
        chai.request(app)
            .get('/api/v1/authors')
            .set('Accept', 'application/json')
            .end((error, response) => {
                expect(response.status).to.equal(200);
                expect(response.body.message).to.be.a('string');
                expect(response.body.message).to.equal('No Author found')
                expect(response.body.data).to.have.length(0);
                done();
            })
    })
})