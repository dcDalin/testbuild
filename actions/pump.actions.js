"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.allLogs = exports.stopPump = exports.startPump = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _utils = require("./pump/utils");

var _couch = require("../db/couch");

var dbName = 'pump-logs';
var pumpLogs = (0, _couch.db)(dbName);
var duration = 0;
var intervalId = 0; // time in millisec the pump function runs

var pumpDuration = 100;

var startPump = function startPump(req, res) {
  var _req$query = req.query,
      pump = _req$query.pump,
      dir = _req$query.dir,
      speed = _req$query.speed,
      dur = _req$query.dur;
  var durInt = parseInt(dur);
  console.log('Pump is: ', pump);
  console.log('Dir is: ', dir);
  console.log('Speed is: ', speed);
  console.log('dur is: ', dur);
  var durInMilisec = durInt * 1000; // TODO: More validations

  if (!pump) {
    return res.status(400).json({
      status: 'error',
      message: 'No pump in the query params'
    });
  }

  console.log('********* dur hard press is: ', duration); // if no duration passed

  if (durInt === 0) {
    if (intervalId === 0) {
      intervalId = setInterval(function () {
        // update time in milisec
        duration += 100;
        (0, _utils.dosingPump)(pump, dir, speed, durInt);
      }, pumpDuration);
    }
  } else if (dur !== 0) {
    console.log('Going to else statement ');
    (0, _utils.dosingPump)(pump, dir, speed, durInMilisec);
  }

  return res.json({
    status: 'true',
    message: "".concat(pump, " pump is not running")
  });
};

exports.startPump = startPump;

var stopPump = function stopPump(req, res) {
  var pump = req.query.pump;
  (0, _utils.dosingPumpStop)(pump, duration, new Date());

  if (intervalId !== 0) {
    clearInterval(intervalId);
    intervalId = 0; // reset duration

    duration = 0;
    return res.json({
      status: 'success',
      message: 'Pump stopped'
    });
  }

  return res.json({
    status: 'failed',
    message: 'Pump not stopped'
  });
};

exports.stopPump = stopPump;

var allLogs = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return pumpLogs.list({
              include_docs: true
            });

          case 3:
            data = _context.sent;

            if (!data) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.json({
              status: 'success',
              data: data.rows.reverse()
            }));

          case 6:
            return _context.abrupt("return", res.json({
              status: 'failed',
              message: 'Could not fetch logs'
            }));

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.json({
              status: 'error',
              message: 'Something went wrong',
              data: _context.t0
            }));

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 9]]);
  }));

  return function allLogs(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.allLogs = allLogs;