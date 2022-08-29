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

var _models = _interopRequireDefault(require("../src/models"));

var AuthorsService = /*#__PURE__*/function () {
  function AuthorsService() {
    (0, _classCallCheck2["default"])(this, AuthorsService);
  }

  (0, _createClass2["default"])(AuthorsService, null, [{
    key: "getAllAuthors",
    value: function () {
      var _getAllAuthors = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _models["default"].Authors.findAll();

              case 3:
                return _context.abrupt("return", _context.sent);

              case 6:
                _context.prev = 6;
                _context.t0 = _context["catch"](0);
                throw _context.t0;

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 6]]);
      }));

      function getAllAuthors() {
        return _getAllAuthors.apply(this, arguments);
      }

      return getAllAuthors;
    }()
  }, {
    key: "addAuthor",
    value: function () {
      var _addAuthor = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(newAuthor) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _models["default"].Authors.create(newAuthor);

              case 3:
                return _context2.abrupt("return", _context2.sent);

              case 6:
                _context2.prev = 6;
                _context2.t0 = _context2["catch"](0);
                throw _context2.t0;

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 6]]);
      }));

      function addAuthor(_x) {
        return _addAuthor.apply(this, arguments);
      }

      return addAuthor;
    }()
  }, {
    key: "updateAuthor",
    value: function () {
      var _updateAuthor2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(id, _updateAuthor) {
        var authorToUpdate;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _models["default"].Authors.findOne({
                  where: {
                    author_id: Number(id)
                  }
                });

              case 3:
                authorToUpdate = _context3.sent;

                if (!authorToUpdate) {
                  _context3.next = 8;
                  break;
                }

                _context3.next = 7;
                return _models["default"].Authors.update(_updateAuthor, {
                  where: {
                    author_id: Number(id)
                  }
                });

              case 7:
                return _context3.abrupt("return", _updateAuthor);

              case 8:
                return _context3.abrupt("return", null);

              case 11:
                _context3.prev = 11;
                _context3.t0 = _context3["catch"](0);
                throw _context3.t0;

              case 14:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 11]]);
      }));

      function updateAuthor(_x2, _x3) {
        return _updateAuthor2.apply(this, arguments);
      }

      return updateAuthor;
    }()
  }, {
    key: "getOneAuthor",
    value: function () {
      var _getOneAuthor = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(id) {
        var theAuthor;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return _models["default"].Authors.findOne({
                  where: {
                    author_id: Number(id)
                  }
                });

              case 3:
                theAuthor = _context4.sent;
                return _context4.abrupt("return", theAuthor);

              case 7:
                _context4.prev = 7;
                _context4.t0 = _context4["catch"](0);
                throw _context4.t0;

              case 10:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 7]]);
      }));

      function getOneAuthor(_x4) {
        return _getOneAuthor.apply(this, arguments);
      }

      return getOneAuthor;
    }()
  }, {
    key: "deleteAuthor",
    value: function () {
      var _deleteAuthor = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(id) {
        var authorToDelete, deletedAuthor;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return _models["default"].Authors.findOne({
                  where: {
                    author_id: Number(id)
                  }
                });

              case 3:
                authorToDelete = _context5.sent;

                if (!authorToDelete) {
                  _context5.next = 9;
                  break;
                }

                _context5.next = 7;
                return _models["default"].Authors.destroy({
                  where: {
                    author_id: Number(id)
                  }
                });

              case 7:
                deletedAuthor = _context5.sent;
                return _context5.abrupt("return", deletedAuthor);

              case 9:
                return _context5.abrupt("return", null);

              case 12:
                _context5.prev = 12;
                _context5.t0 = _context5["catch"](0);
                throw _context5.t0;

              case 15:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 12]]);
      }));

      function deleteAuthor(_x5) {
        return _deleteAuthor.apply(this, arguments);
      }

      return deleteAuthor;
    }()
  }]);
  return AuthorsService;
}();

var _default = AuthorsService;
exports["default"] = _default;
//# sourceMappingURL=AuthorsService.js.map