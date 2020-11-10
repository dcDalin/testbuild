"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wifiConnect = exports.wifiList = exports.wifiScan = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _rpiWifiConnection = _interopRequireDefault(require("rpi-wifi-connection"));

var _callerId = _interopRequireDefault(require("caller-id"));

var _couch = require("../db/couch");

/* eslint-disable no-console */
var wifi = new _rpiWifiConnection["default"]();

var timeOut = function timeOut(ms) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
};

var wifiScan = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_req, res) {
    var ssids;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return wifi.scan();

          case 3:
            ssids = _context.sent;
            // writeLog('WiFi', '', funct, ssids);
            console.log(ssids);
            _context.next = 7;
            return timeOut(1000);

          case 7:
            return _context.abrupt("return", res.json({
              status: 'success',
              // data: ssids,
              data: ssids
            }));

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.json({
              status: 'error',
              data: _context.t0
            }));

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 10]]);
  }));

  return function wifiScan(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.wifiScan = wifiScan;

var wifiList = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_req, res) {
    var funct, wifiNetworks;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            funct = _callerId["default"].getData().functionName;
            _context2.prev = 1;
            _context2.next = 4;
            return wifi.getNetworks();

          case 4:
            wifiNetworks = _context2.sent;

            if (!wifiNetworks) {
              _context2.next = 8;
              break;
            }

            (0, _couch.writeLog)('WiFi', '', funct, wifiNetworks);
            return _context2.abrupt("return", res.json({
              status: 'success',
              data: wifiNetworks
            }));

          case 8:
            return _context2.abrupt("return", res.json({
              status: 'error',
              data: 'Something went wrong'
            }));

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](1);
            return _context2.abrupt("return", res.json({
              status: 'error',
              data: _context2.t0
            }));

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 11]]);
  }));

  return function wifiList(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.wifiList = wifiList;

var wifiConnect = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var funct, _req$body, ssid, psk, connect;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            funct = _callerId["default"].getData().functionName;
            _context3.prev = 1;
            _req$body = req.body, ssid = _req$body.ssid, psk = _req$body.psk;
            _context3.next = 5;
            return wifi.connect({
              ssid: ssid,
              psk: psk
            });

          case 5:
            connect = _context3.sent;
            (0, _couch.writeLog)('WiFi', '', funct, connect);
            return _context3.abrupt("return", res.json({
              status: 'success',
              data: "Connected to wifi ".concat(connect)
            }));

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](1);
            return _context3.abrupt("return", res.json({
              status: 'error',
              data: _context3.t0
            }));

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 10]]);
  }));

  return function wifiConnect(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.wifiConnect = wifiConnect;