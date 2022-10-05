import chai, { AssertionError } from 'chai';
import chatHttp from 'chai-http';
import 'chai/register-should.js';
import app from '../index';
import bcryptjs from "bcryptjs"
import ObjectUtils from "../server/utils/ObjectUtils";

chai.use(chatHttp);
const { expect, assert } = chai;

describe('Testing the Users Endpoint', () => {
    it('It should create new user', done => {
        const newUser = {
            user_name: 'bean1810',
            password: 'dung0981248806',
            email: 'mr.bean5201314@gmail.com',
            userType: 1,
            access_token: ''
        }
        chai.request(app)
            .post('/api/v1/users')
            .set('Accept', 'application/json')
            .send(newUser)
            .end((error, response) => {
                expect(response.status).to.equal(200);
                expect(response.body.message).to.equal('User created successfully');
                const hashPassword = bcryptjs.hashSync(newUser.password, 10);
                const compare = bcryptjs.compareSync(response.body.data.password, hashPassword);
                expect(compare).to.not.be.null;
                done();
            })
    });

    it('It should get all users', done => {
        chai.request(app)
            .get('/api/v1/users')
            .set('Accept', 'application/json')
            .end((error, response) => {
                expect(response.status).to.equal(200);
                expect(response.body.data).to.have.length(1);
                done();
            })
    });

    it('It should authenticate successfully', done => {
        const request = {
            userName: 'bean1810',
            password: 'dung0981248806'
        };

        chai.request(app)
            .post('/api/v1/users/authentication')
            .set('Accept', 'application/json')
            .send(request)
            .end((error, response) => {
                expect(response.status).to.equal(200);
                expect(response.body.data.auth).to.equal(true);
                const cookie = response.get('Set-Cookie')[0];
                const extractCookie = ObjectUtils.convertStringToArray(cookie, ';');
                const getAccessToken = ObjectUtils.extractToken(extractCookie[0]);
                const verify = ObjectUtils.verifyToken(getAccessToken);
                expect(verify).to.equal(true);
                done();
            });
    });

    it('It should authenticate failed when password is wrong', done => {
        const request = {
            userName: 'bean1810',
            password: 'dung0989032963'
        };

        chai.request(app)
            .post('/api/v1/users/authentication')
            .set('Accept', 'application/json')
            .send(request)
            .end((error, response) => {
                expect(response.status).to.equal(401);
                expect(response.body.message).to.equal('Cannot found any user. Please check the user name and password');
                done();
            });
    });

    it('It should authenticate failed when user does not exist', done => {
        const request = {
            userName: 'dung10',
            password: 'dung0981248806'
        };

        chai.request(app)
            .post('/api/v1/users/authentication')
            .set('Accept', 'application/json')
            .send(request)
            .end((error, response) => {
                expect(response.status).to.equal(400);
                expect(response.body.message).to.equal('User does not exist');
                done();
            });
    });
})