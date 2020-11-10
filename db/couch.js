"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.replicateDB = exports.deleteDB = exports.findMissingDbs = exports.createMissingDbs = exports.createDB = exports.listAllDbs = exports.writeLog = exports.getHashedPass = exports.insertDoc = exports.db = exports.nano = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _nano = _interopRequireDefault(require("nano"));

var _moment = _interopRequireDefault(require("moment"));

var _callerId = _interopRequireDefault(require("caller-id"));

var _env = _interopRequireDefault(require("../env"));

var _hashPassword = _interopRequireDefault(require("../utils/hashPassword"));

/* eslint-disable no-console */
// env
var MUST_HAVE_DBS = (0, _env["default"])('MUST_HAVE_DBS');
var DEVICE_ID = (0, _env["default"])('DEVICE_ID');
var LOCAL_DB_URL = (0, _env["default"])('LOCAL_DB_URL');
var MAC_ADDRESS = (0, _env["default"])('MAC_ADDRESS'); // TODO: Automatically get mac address

console.log('*********** dbs: ', MUST_HAVE_DBS); // instanciate nano

var nano = (0, _nano["default"])(LOCAL_DB_URL);
exports.nano = nano;

var db = function db(dbName) {
  return nano.use(dbName);
};

exports.db = db;

var insertDoc = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(dbName, keyValueArray) {
    var activeDb, body;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            activeDb = nano.use(dbName);
            _context.prev = 1;
            _context.next = 4;
            return activeDb.insert(keyValueArray);

          case 4:
            body = _context.sent;
            console.log('New document created: ', body);
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](1);
            console.log("Error: ".concat(_context.t0));

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 8]]);
  }));

  return function insertDoc(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.insertDoc = insertDoc;

var getHashedPass = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(pass) {
    var a;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return (0, _hashPassword["default"])(pass);

          case 3:
            a = _context2.sent;
            insertDoc(a);
            _context2.next = 10;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            console.log("Error: ".concat(_context2.t0));

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));

  return function getHashedPass(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getHashedPass = getHashedPass;

var writeLog = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(type, user, funct, msg) {
    var constructedArray;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            constructedArray = {
              type: type,
              user: user,
              funct: funct,
              msg: msg,
              time: (0, _moment["default"])(),
              device_id: MAC_ADDRESS,
              device_name: DEVICE_ID
            };
            _context3.next = 3;
            return insertDoc('logs', constructedArray);

          case 3:
            // console.log("Logged data: ", constructedArray);
            console.log("Log saved... ".concat(funct));

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function writeLog(_x4, _x5, _x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();

exports.writeLog = writeLog;

var listAllDbs = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return nano.db.list().then(function (body) {
              // body is an array
              console.log('All current local dbs: ');
              body.forEach(function (db) {
                console.log([db]);
              });
            });

          case 3:
            _context4.next = 8;
            break;

          case 5:
            _context4.prev = 5;
            _context4.t0 = _context4["catch"](0);
            console.log('Error: ', _context4.t0);

          case 8:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 5]]);
  }));

  return function listAllDbs() {
    return _ref4.apply(this, arguments);
  };
}();

exports.listAllDbs = listAllDbs;

var createDB = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(dbName) {
    var funct;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            funct = _callerId["default"].getData().functionName;
            _context5.prev = 1;
            _context5.next = 4;
            return nano.db.create(dbName);

          case 4:
            console.log("Created DB: ".concat(dbName));
            writeLog('DB', '', funct, dbName);
            _context5.next = 8;
            return listAllDbs();

          case 8:
            _context5.next = 14;
            break;

          case 10:
            _context5.prev = 10;
            _context5.t0 = _context5["catch"](1);
            console.log("Error in createDB: ".concat(_context5.t0));
            writeLog('DB_Error', '', funct, _context5.t0);

          case 14:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 10]]);
  }));

  return function createDB(_x8) {
    return _ref5.apply(this, arguments);
  };
}();

exports.createDB = createDB;

var createMissingDbs = function createMissingDbs(missingDbs) {
  missingDbs.forEach(function (a) {
    createDB(a);
  });
};

exports.createMissingDbs = createMissingDbs;

var findMissingDbs = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return nano.db.list().then(function (body) {
              // body is an array
              console.log('Current DBs: ', body);
              var currentArray = body;
              var currentDBS = new Set(currentArray);
              var missingDbs = JSON.parse(MUST_HAVE_DBS).filter(function (x) {
                return !currentDBS.has(x);
              });
              console.log('Missing DBs: ', missingDbs);
              createMissingDbs(missingDbs);
              writeLog('Boot', '', 'findMissingDbs', missingDbs);
            });

          case 3:
            _context6.next = 9;
            break;

          case 5:
            _context6.prev = 5;
            _context6.t0 = _context6["catch"](0);
            console.log(_context6.t0);
            throw new Error(_context6.t0);

          case 9:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 5]]);
  }));

  return function findMissingDbs() {
    return _ref6.apply(this, arguments);
  };
}();

exports.findMissingDbs = findMissingDbs;

var deleteDB = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(dbName) {
    var funct;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            funct = _callerId["default"].getData().functionName;
            _context7.prev = 1;
            _context7.next = 4;
            return nano.db.destroy(dbName);

          case 4:
            console.log("Deleteted DB: ".concat(dbName));
            writeLog('DB', '', funct, dbName);
            _context7.next = 8;
            return listAllDbs();

          case 8:
            _context7.next = 14;
            break;

          case 10:
            _context7.prev = 10;
            _context7.t0 = _context7["catch"](1);
            console.log("Error in deleteDB: ".concat(_context7.t0));
            writeLog('DB_Error', '', funct, _context7.t0);

          case 14:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[1, 10]]);
  }));

  return function deleteDB(_x9) {
    return _ref7.apply(this, arguments);
  };
}();

exports.deleteDB = deleteDB;

var replicateDB = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(dbName, remoteDbUrl) {
    var funct, fullRemoteDbUrl;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            funct = _callerId["default"].getData().functionName;
            fullRemoteDbUrl = "".concat(remoteDbUrl, "/").concat(dbName);
            console.log(fullRemoteDbUrl);
            _context8.next = 5;
            return nano.db.replicate(dbName, fullRemoteDbUrl, {
              create_target: true
            }).then(function (body) {
              // if requested DB does not exist, it will be created
              // console.log(body);
              writeLog('DB', '', funct, body);
              return body;
            });

          case 5:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function replicateDB(_x10, _x11) {
    return _ref8.apply(this, arguments);
  };
}();

exports.replicateDB = replicateDB;