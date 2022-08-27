"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _AuthorsService = _interopRequireDefault(require("../services/AuthorsService"));

var _ResponseUtils = _interopRequireDefault(require("../utils/ResponseUtils"));

var _ObjectUtils = _interopRequireDefault(require("../utils/ObjectUtils"));

var responseUtils = new _ResponseUtils["default"]();

var AuthorController = /*#__PURE__*/function () {
  function AuthorController() {
    (0, _classCallCheck2["default"])(this, AuthorController);
  }

  (0, _createClass2["default"])(AuthorController, null, [{
    key: "getAllAuthors",
    value: function () {
      var _getAllAuthors = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var allAuthors;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _AuthorsService["default"].getAllAuthors();

              case 3:
                allAuthors = _context.sent;

                if (allAuthors.length > 0) {
                  responseUtils.setSuccess(200, 'Authors retrieved', allAuthors);
                } else {
                  responseUtils.setSuccess(200, 'No Author found');
                }

                return _context.abrupt("return", responseUtils.send(res));

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](0);
                responseUtils.setError(400, _context.t0);
                return _context.abrupt("return", responseUtils.send(res));

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 8]]);
      }));

      function getAllAuthors(_x, _x2) {
        return _getAllAuthors.apply(this, arguments);
      }

      return getAllAuthors;
    }()
  }, {
    key: "upsertAuthor",
    value: function () {
      var _upsertAuthor = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var isAuthorExist;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (_ObjectUtils["default"].isObjectNotEmpty(req.body)) {
                  _context2.next = 3;
                  break;
                }

                responseUtils.setError(400, 'Please provide complete details');
                return _context2.abrupt("return", responseUtils.send(res));

              case 3:
                _context2.next = 5;
                return _AuthorsService["default"].getOneAuthor(req.body.author_id);

              case 5:
                isAuthorExist = _context2.sent;

                if (isAuthorExist) {
                  AuthorController.updatedAuthor(req, res);
                } else {
                  AuthorController.addAuthor(req, res);
                }

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function upsertAuthor(_x3, _x4) {
        return _upsertAuthor.apply(this, arguments);
      }

      return upsertAuthor;
    }()
  }, {
    key: "addAuthor",
    value: function () {
      var _addAuthor = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        var newAuthor, createdAuthor;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (_ObjectUtils["default"].isObjectNotEmpty(req.body)) {
                  _context3.next = 3;
                  break;
                }

                responseUtils.setError(400, 'Please provide complete details');
                return _context3.abrupt("return", responseUtils.send(res));

              case 3:
                newAuthor = req.body;
                _context3.prev = 4;
                _context3.next = 7;
                return _AuthorsService["default"].addAuthor(newAuthor);

              case 7:
                createdAuthor = _context3.sent;
                responseUtils.setSuccess(201, 'Author Added!', createdAuthor);
                return _context3.abrupt("return", responseUtils.send(res));

              case 12:
                _context3.prev = 12;
                _context3.t0 = _context3["catch"](4);
                responseUtils.setError(400, _context3.t0.message);
                return _context3.abrupt("return", responseUtils.send(res));

              case 16:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[4, 12]]);
      }));

      function addAuthor(_x5, _x6) {
        return _addAuthor.apply(this, arguments);
      }

      return addAuthor;
    }()
  }, {
    key: "updatedAuthor",
    value: function () {
      var _updatedAuthor = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
        var alteredAuthor, _ref, id, updateAuthor;

        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                alteredAuthor = req.body;
                _ref = !_ObjectUtils["default"].isEmpty(req.params) ? req.params : {
                  id: req.body.author_id
                }, id = _ref.id;

                if (Number(id)) {
                  _context4.next = 5;
                  break;
                }

                responseUtils.setError(400, 'Please input a valid numeric value');
                return _context4.abrupt("return", responseUtils.send(res));

              case 5:
                _context4.prev = 5;
                _context4.next = 8;
                return _AuthorsService["default"].updateAuthor(id, alteredAuthor);

              case 8:
                updateAuthor = _context4.sent;

                if (!updateAuthor) {
                  responseUtils.setError(404, "Cannot find Author with the author_id: ".concat(id));
                } else {
                  responseUtils.setSuccess(200, 'Author updated', updateAuthor);
                }

                return _context4.abrupt("return", responseUtils.send(res));

              case 13:
                _context4.prev = 13;
                _context4.t0 = _context4["catch"](5);
                responseUtils.setError(404, _context4.t0);
                return _context4.abrupt("return", responseUtils.send(res));

              case 17:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[5, 13]]);
      }));

      function updatedAuthor(_x7, _x8) {
        return _updatedAuthor.apply(this, arguments);
      }

      return updatedAuthor;
    }()
  }, {
    key: "getAAuthor",
    value: function () {
      var _getAAuthor = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
        var id, theAuthor;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                id = req.params.id;

                if (Number(id)) {
                  _context5.next = 4;
                  break;
                }

                responseUtils.setError(400, 'Please input a valid numeric value');
                return _context5.abrupt("return", responseUtils.send(res));

              case 4:
                _context5.prev = 4;
                _context5.next = 7;
                return _AuthorsService["default"].getOneAuthor(id);

              case 7:
                theAuthor = _context5.sent;

                if (!theAuthor) {
                  responseUtils.setError(404, "Cannot find Author with the author_id ".concat(id));
                } else {
                  responseUtils.setSuccess(200, 'Found Author', theAuthor);
                }

                return _context5.abrupt("return", responseUtils.send(res));

              case 12:
                _context5.prev = 12;
                _context5.t0 = _context5["catch"](4);
                responseUtils.setError(404, _context5.t0);
                return _context5.abrupt("return", responseUtils.send(res));

              case 16:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[4, 12]]);
      }));

      function getAAuthor(_x9, _x10) {
        return _getAAuthor.apply(this, arguments);
      }

      return getAAuthor;
    }()
  }, {
    key: "deleteAuthor",
    value: function () {
      var _deleteAuthor = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
        var id, authorToDelete;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                id = req.params.id;

                if (Number(id)) {
                  _context6.next = 4;
                  break;
                }

                responseUtils.setError(400, 'Please provide a numeric value');
                return _context6.abrupt("return", responseUtils.send(res));

              case 4:
                _context6.prev = 4;
                _context6.next = 7;
                return _AuthorsService["default"].deleteAuthor(id);

              case 7:
                authorToDelete = _context6.sent;

                if (authorToDelete) {
                  responseUtils.setSuccess(200, 'Author deleted');
                } else {
                  responseUtils.setError(404, "Author with the author_id ".concat(id, " cannot be found"));
                }

                return _context6.abrupt("return", responseUtils.send(res));

              case 12:
                _context6.prev = 12;
                _context6.t0 = _context6["catch"](4);
                responseUtils.setError(400, _context6.t0);
                return _context6.abrupt("return", responseUtils.send(res));

              case 16:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[4, 12]]);
      }));

      function deleteAuthor(_x11, _x12) {
        return _deleteAuthor.apply(this, arguments);
      }

      return deleteAuthor;
    }()
  }]);
  return AuthorController;
}();

var _default = AuthorController;
exports["default"] = _default;
//# sourceMappingURL=AuthorsController.js.map