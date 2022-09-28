import chai, { AssertionError } from 'chai';
import chatHttp from 'chai-http';
import 'chai/register-should.js';
import app from '../index';

chai.use(chatHttp);
const { expect, assert } = chai;

describe('Testing Article Endpoint', () => {
    it('It should create new Article', done => {
        const article = {
            author_id: 1,
            title: 'Testing Article',
            slug: 'testing-article',
            view: 0,
            image_post: 'https://abc.png',
            body: 'This is a testing article',
            category: 'Testing',
            published: true,
            images: [],
            isShowImage: true,
            transliterated: 'Testing',
            summanyContent: 'Testing'
        }
        chai.request(app)
            .post('/api/v1/articles')
            .set('Accept', 'application/json')
            .send(article)
            .end((error, response) => {
                expect(response.status).to.equal(200);
                expect(response.body.data).to.deep.include({
                    id: 1,
                    author_id: article.author_id,
                    title: article.title,
                    slug: article.slug,
                    view: article.view,
                    image_post: article.image_post,
                    body: article.body,
                    category: article.category,
                    published: article.published,
                    images: article.images,
                    isShowImage: article.isShowImage,
                    transliterated: article.transliterated,
                    summanyContent: article.summanyContent
                });
                done();
            })
    });

    it('It should get one articles', done => {
        chai.request(app)
            .get('/api/v1/articles')
            .set('Accept', 'application/json')
            .end((error, response) => {
                expect(response.status).to.equal(200);
                expect(response.body.data).to.have.length(1);
                done();
            })
    })

    it('It should get one articles by slug', done => {
        const articleSlug = 'testing-article'
        chai.request(app)
            .get(`/api/v1/articles/${articleSlug}`)
            .set('Accept', 'application/json')
            .end((error, response) => {
                expect(response.status).to.equal(200);
                expect(response.body.data.slug).to.equal(articleSlug);
                done();
            })
    });

    it('It should not get articles by wrong slug', done => {
        const articleSlug = 'testing-article-123'
        chai.request(app)
            .get(`/api/v1/articles/${articleSlug}`)
            .set('Accept', 'application/json')
            .end((error, response) => {
                expect(response.status).to.equal(200);
                expect(response.body.message).to.equal('No Article Found');
                done();
            })
    });

    it('It should update existing articles', done => {
        const article = {
            id: 1,
            author_id: 1,
            title: 'Testing Article 123',
            slug: 'testing-article',
            view: 0,
            image_post: 'https://abc.png',
            body: 'This is a testing article',
            category: 'Testing',
            published: true,
            images: [],
            isShowImage: true,
            transliterated: 'Testing',
            summanyContent: 'Testing'
        }
        chai.request(app)
            .put(`/api/v1/articles/${article.id}`)
            .set('Accept', 'application/json')
            .send(article)
            .end((error, response) => {
                expect(response.status).to.equal(200);
                expect(response.body.data).to.deep.include({
                    id: 1,
                    author_id: article.author_id,
                    title: article.title,
                    slug: article.slug,
                    view: article.view,
                    image_post: article.image_post,
                    body: article.body,
                    category: article.category,
                    published: article.published,
                    images: article.images,
                    isShowImage: article.isShowImage,
                    transliterated: article.transliterated,
                    summanyContent: article.summanyContent
                });
                done();
            })
    })

    it('It should not update non-existing articles', done => {
        const article = {
            id: 12,
            author_id: 1,
            title: 'Testing Article 123',
            slug: 'testing-article',
            view: 0,
            image_post: 'https://abc.png',
            body: 'This is a testing article',
            category: 'Testing',
            published: true,
            images: [],
            isShowImage: true,
            transliterated: 'Testing',
            summanyContent: 'Testing'
        }
        chai.request(app)
            .put(`/api/v1/articles/${article.id}`)
            .set('Accept', 'application/json')
            .send(article)
            .end((error, response) => {
                expect(response.status).to.equal(200);
                expect(response.body.message).to.equal('Article not exist')
                done();
            })
    })

    it('It should delete existing articles', done => {
        const articleId = 1;

        chai.request(app)
            .delete(`/api/v1/articles/${articleId}`)
            .set('Accept', 'application/json')
            .end((error, response) => {
                expect(response.status).to.equal(200);
                expect(response.body.message).to.be.a('string');
                expect(response.body.message).to.equal('Article deleted')
                done();
            })
    })

    it('It should not delete non-existing articles', done => {
        const articleId = 12;

        chai.request(app)
            .delete(`/api/v1/articles/${articleId}`)
            .set('Accept', 'application/json')
            .end((error, response) => {
                expect(response.status).to.equal(200);
                expect(response.body.message).to.be.a('string');
                expect(response.body.message).to.equal(`Article with id ${articleId} cannot be found`)
                done();
            })
    })

    it('It should not get a deleted Article', done => {
        chai.request(app)
            .get('/api/v1/articles')
            .set('Accept', 'application/json')
            .end((error, response) => {
                expect(response.status).to.equal(200);
                expect(response.body.data).to.have.length(0);
                done();
            })
    })
})