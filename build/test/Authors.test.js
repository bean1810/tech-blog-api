"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

require("chai/register-should.js");

var _index = _interopRequireDefault(require("../index"));

_chai["default"].use(_chaiHttp["default"]);

var expect = _chai["default"].expect;
describe('Testing the Authors endpoint', function () {
  it('It should create an author', function (done) {
    var author = {
      author_id: 1,
      first_name: 'Dung',
      last_name: 'Tran',
      artist_name: 'Mr.Bean'
    };

    _chai["default"].request(_index["default"]).post('/api/v1/authors').set('Accept', 'application/json').send(author).end(function (error, response) {
      expect(response.status).to.equal(201);
      expect(response.body.data).to.include({
        author_id: author.author_id,
        first_name: author.first_name,
        last_name: author.last_name,
        artist_name: author.artist_name
      });
      done();
    });
  });
  it('It should not create an author with null data', function (done) {
    var author = {
      author_id: 2,
      first_name: '',
      last_name: 'Tran',
      artist_name: 'Bean'
    };

    _chai["default"].request(_index["default"]).post('/api/v1/authors').set('Accept', 'application/json').send(author).end(function (error, response) {
      expect(response.status).to.equal(400);
      done();
    });
  });
});
//# sourceMappingURL=Authors.test.js.map