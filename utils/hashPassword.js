"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _pcypher = require("pcypher");

var hashPassword = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(pass) {
    var plainTextPassword, hashedPassword;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            plainTextPassword = pass;
            _context.next = 4;
            return (0, _pcypher.hasher)(plainTextPassword);

          case 4:
            hashedPassword = _context.sent;
            return _context.abrupt("return", hashedPassword);

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            // eslint-disable-next-line no-console
            console.log("Error in hashPassword: ".concat(_context.t0));
            return _context.abrupt("return", _context.t0);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  }));

  return function hashPassword(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = hashPassword;
exports["default"] = _default;