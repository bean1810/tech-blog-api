"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _AuthorsController = _interopRequireDefault(require("../controllers/AuthorsController"));

var router = (0, _express.Router)();
router.get('/', _AuthorsController["default"].getAllAuthors);
router.post('/', _AuthorsController["default"].upsertAuthor);
router.get('/:id', _AuthorsController["default"].getAAuthor);
router.put('/:id', _AuthorsController["default"].updatedAuthor);
router["delete"]('/:id', _AuthorsController["default"].deleteAuthor);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=AuthorsRoutes.js.map