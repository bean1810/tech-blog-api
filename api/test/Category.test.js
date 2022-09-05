import chai, { AssertionError } from 'chai';
import chatHttp from 'chai-http';
import 'chai/register-should.js';
import app from '../index';

chai.use(chatHttp);
const { expect } = chai;

describe('Testing Category Endpoint', () => {

    it('It should get all categories but got empty data', done => {
        chai.request(app)
            .get('/api/v1/category')
            .set('Accept', 'application/json')
            .end((error, response) => {
                expect(response.status).to.equal(200);
                expect(response.body.message).to.be.a('string');
                expect(response.body.message).to.equal('No category found')
                expect(response.body.data).to.have.length(0);
                done();
            })
    })

    it('It should create a single category', done => {
        const category = {
            slug: 'a',
            name: 'Testing',
            image: 'testing image',
            primary: true
        }
        chai.request(app)
            .post('/api/v1/category')
            .set('Accept', 'application/json')
            .send(category)
            .end((error, response) => {
                expect(response.status).to.equal(200);
                expect(response.body.data).to.include({
                    slug: category.slug,
                    name: category.name,
                    image: category.image,
                    primary: category.primary
                })
                done();
            })
    });

    it('It should not create a single category', done => {
        const category = {
            slug: null,
            name: 'Testing',
            image: 'testing image',
            primary: true
        }
        chai.request(app)
            .post('/api/v1/category')
            .set('Accept', 'application/json')
            .send(category)
            .end((error, response) => {
                expect(response.status).to.equal(400);
                expect(response.body.message).to.be.a('string');
                expect(response.body.message).to.equal('Please provide complete details')
                done();
            })
    });

    it('It should create a multiple category', done => {
        const categories = [{
                "slug": "b",
                "name": "category1",
                "image": "testing image",
                "primary": true
            },
            {
                "slug": "c",
                "name": "Testing c",
                "image": "testing image",
                "primary": true
            }
        ]
        chai.request(app)
            .post('/api/v1/category')
            .set('Accept', 'application/json')
            .send(categories)
            .end((error, response) => {
                expect(response.status).to.equal(200);
                expect(response.body.data).to.have.length(2);
                done();
            })
    });

    it('It should not create a multiple category when input array is empty', done => {
        const categories = [];
        chai.request(app)
            .post('/api/v1/category')
            .set('Accept', 'application/json')
            .send(categories)
            .end((error, response) => {
                expect(response.status).to.equal(400);
                expect(response.body.message).to.be.a('string');
                expect(response.body.message).to.equal('Please provide complete details')
                done();
            })
    });

    it('It should not create a multiple category when object in input array is empty', done => {
        const categories = [{
                "slug": null,
                "name": "Testing b",
                "image": "testing image",
                "primary": true
            },
            {
                "slug": "c",
                "name": "Testing c",
                "image": "testing image",
                "primary": true
            }
        ]
        chai.request(app)
            .post('/api/v1/category')
            .set('Accept', 'application/json')
            .send(categories)
            .end((error, response) => {
                expect(response.status).to.equal(400);
                expect(response.body.message).to.be.a('string');
                expect(response.body.message).to.equal('Please provide complete details')
                done();
            })
    });

    it('It should get all categories', done => {
        chai.request(app)
            .get('/api/v1/category')
            .set('Accept', 'application/json')
            .end((error, response) => {
                expect(response.status).to.equal(200);
                expect(response.body.message).to.be.a('string');
                expect(response.body.message).to.equal('Categories retrieved successfully')
                expect(response.body.data).to.have.length(3);
                done();
            })
    })

    it('It should get only one category', done => {
        chai.request(app)
            .get('/api/v1/category/category1')
            .set('Accept', 'application/json')
            .end((error, response) => {
                expect(response.status).to.equal(200);
                expect(response.body.message).to.be.a('string');
                expect(response.body.message).to.equal('Found Category')
                expect(response.body.data).to.have.length(1);
                done();
            })
    })

    it('It should get only one category but no category found', done => {
        chai.request(app)
            .get('/api/v1/category/Testing123')
            .set('Accept', 'application/json')
            .end((error, response) => {
                expect(response.status).to.equal(200);
                expect(response.body.message).to.be.a('string');
                expect(response.body.message).to.equal('No Category Found')
                expect(response.body.data).to.have.length(0);
                done();
            })
    })
})