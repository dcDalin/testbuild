"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupStatus = exports.setupNew = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _macaddress = _interopRequireDefault(require("macaddress"));

var _couch = require("../db/couch");

var dbName = 'setup';
var setup = (0, _couch.db)(dbName);

var setupNew = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, deviceName, companyName, defaultLanguage, responsiblePerson, phoneNumber, email, status, deviceMacAddress, data;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$body = req.body, deviceName = _req$body.deviceName, companyName = _req$body.companyName, defaultLanguage = _req$body.defaultLanguage, responsiblePerson = _req$body.responsiblePerson, phoneNumber = _req$body.phoneNumber, email = _req$body.email; // TODO: Validate input

            status = 'complete';
            _context.next = 5;
            return _macaddress["default"].one();

          case 5:
            deviceMacAddress = _context.sent;
            data = {
              _id: deviceMacAddress,
              deviceName: deviceName,
              companyName: companyName,
              defaultLanguage: defaultLanguage,
              responsiblePerson: responsiblePerson,
              phoneNumber: phoneNumber,
              email: email,
              status: status
            };
            _context.next = 9;
            return setup.insert(data);

          case 9:
            return _context.abrupt("return", res.status(201).json({
              status: 'success',
              message: 'Setup is complete',
              data: data
            }));

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.json({
              status: 'error',
              message: 'Could not complete setup',
              data: _context.t0
            }));

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 12]]);
  }));

  return function setupNew(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.setupNew = setupNew;

var setupStatus = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_req, res) {
    var deviceMacAddress, deviceStatus;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _macaddress["default"].one();

          case 3:
            deviceMacAddress = _context2.sent;
            console.log('Mac addr is: ', deviceMacAddress);
            _context2.next = 7;
            return setup.get(deviceMacAddress);

          case 7:
            deviceStatus = _context2.sent;
            return _context2.abrupt("return", res.status(201).json({
              status: 'success',
              message: 'Retreived device status',
              data: deviceStatus
            }));

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", res.json({
              status: 'error',
              message: 'Could not fetch setup status',
              data: _context2.t0
            }));

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 11]]);
  }));

  return function setupStatus(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.setupStatus = setupStatus;