"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var ObjectUtils = /*#__PURE__*/function () {
  function ObjectUtils() {
    (0, _classCallCheck2["default"])(this, ObjectUtils);
  }

  (0, _createClass2["default"])(ObjectUtils, null, [{
    key: "isObjectNotEmpty",
    value: function isObjectNotEmpty(obj) {
      return Object.values(obj).every(function (v) {
        return !!v;
      });
    }
  }, {
    key: "isEmpty",
    value: function isEmpty(obj) {
      return obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype;
    }
  }]);
  return ObjectUtils;
}();

exports["default"] = ObjectUtils;
//# sourceMappingURL=ObjectUtils.js.map