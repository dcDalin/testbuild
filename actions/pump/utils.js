"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dosingPump = exports.dosingPumpStop = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _callerId = _interopRequireDefault(require("caller-id"));

var _env = _interopRequireDefault(require("../../env"));

var _pca9685Simulator = _interopRequireDefault(require("./pca9685Simulator"));

var _couch = require("../../db/couch");

/* eslint-disable no-console */
var dbName = 'pump-logs';
var pumpLogs = (0, _couch.db)(dbName);

var Pca9685 = require('pca9685').Pca9685Driver;

var TARGET = (0, _env["default"])('TARGET');
var optionsAbPump;
var Pca9685Driver;

if (TARGET === 'Simulator') {
  Pca9685Driver = _pca9685Simulator["default"];
  optionsAbPump = {
    i2c: 0,
    address: 0x40,
    frequency: 100,
    debug: true
  };
} else {
  // eslint-disable-next-line global-require
  var i2cBus = require('i2c-bus');

  Pca9685Driver = Pca9685;
  optionsAbPump = {
    i2c: i2cBus.openSync(1),
    address: 0x40,
    frequency: 40,
    debug: false
  };
}

var pwm = new Pca9685Driver(optionsAbPump, function (err) {
  if (err) {
    console.error('Error initializing PCA9685 (I2C)');
    process.exit(-1);
  }

  console.log('I2C initialization done');
});

var dosingPumpStop = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(pump, duration, time) {
    var data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (pump === 'water') {
              pwm.channelOff(0); // pwm.channelOff(0);//UPDATE BACKWARD CHANEL number
            }

            if (pump === 'water-cooler') {
              pwm.channelOff(7); // pwm.channelOff(0);//UPDATE BACKWARD CHANEL number
            }

            if (pump === 'd-pump-1') {
              pwm.channelOff(1); // pwm.channelOff(0);//UPDATE BACKWARD CHANEL number
            }

            if (pump === 'd-pump-2') {
              pwm.channelOff(2); // pwm.channelOff(0);//UPDATE BACKWARD CHANEL number
            }

            if (pump === 'd-pump-3') {
              pwm.channelOff(3); // pwm.channelOff(0);//UPDATE BACKWARD CHANEL number
            }

            if (pump === 'd-pump-4') {
              pwm.channelOff(4); // pwm.channelOff(0);//UPDATE BACKWARD CHANEL number
            }

            if (pump === 'd-pump-5') {
              pwm.channelOff(5); // pwm.channelOff(0);//UPDATE BACKWARD CHANEL number
            }

            if (pump === 'd-pump-6') {
              pwm.channelOff(6); // pwm.channelOff(0);//UPDATE BACKWARD CHANEL number
            }

            data = {
              pump: pump,
              duration: duration,
              time: time
            };
            _context.next = 11;
            return pumpLogs.insert(data);

          case 11:
            return _context.abrupt("return", 'done');

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function dosingPumpStop(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.dosingPumpStop = dosingPumpStop;

var dosingPump = function dosingPump(pump, dir, speed, dur) {
  if (pump === 'water') {
    // Main room temp water pump (from bottle to glass)
    if (dir === 'forward') {
      pwm.setDutyCycle(0, speed);
      console.log('Forward with speed: ', speed, 'Pump: ', pump);
    }

    if (dir === 'backward') {
      // pwm.setDutyCycle(0, speed);//UPDATE CHANEL
      console.log('Backward with speed: ', speed, 'Pump: ', pump);
    }

    console.log('***************** dur is: ', dur);

    if (dur !== 0) {
      console.log('Running set timeout');
      setTimeout(function () {
        dosingPumpStop(pump, dur, new Date());
      }, dur);
    }
  }

  if (pump === 'd-pump-1') {
    // Main room temp water pump (from bottle to glass)
    if (dir === 'forward') {
      pwm.setDutyCycle(1, speed);
      console.log('Forward with speed: ', speed, 'Pump: ', pump);
    }

    if (dir === 'backward') {
      // pwm.setDutyCycle(0, speed);//UPDATE CHANEL
      console.log('Backward with speed: ', speed, 'Pump: ', pump);
    }

    if (dur !== 0) {
      setTimeout(function () {
        dosingPumpStop(pump, dur, new Date());
      }, dur);
    }
  }

  if (pump === 'd-pump-2') {
    // Main room temp water pump (from bottle to glass)
    if (dir === 'forward') {
      pwm.setDutyCycle(2, speed);
      console.log('Forward with speed: ', speed, 'Pump: ', pump);
    }

    if (dir === 'backward') {
      // pwm.setDutyCycle(0, speed);//UPDATE CHANEL
      console.log('Backward with speed: ', speed, 'Pump: ', pump);
    }

    if (dur !== 0) {
      setTimeout(function () {
        dosingPumpStop(pump, dur, new Date());
      }, dur);
    }
  }

  if (pump === 'd-pump-3') {
    // Main room temp water pump (from bottle to glass)
    if (dir === 'forward') {
      pwm.setDutyCycle(3, speed);
      console.log('Forward with speed: ', speed, 'Pump: ', pump);
    }

    if (dir === 'backward') {
      // pwm.setDutyCycle(0, speed);//UPDATE CHANEL
      console.log('Backward with speed: ', speed, 'Pump: ', pump);
    }

    if (dur !== 0) {
      setTimeout(function () {
        dosingPumpStop(pump, dur, new Date());
      }, dur);
    }
  }

  if (pump === 'd-pump-4') {
    // Main room temp water pump (from bottle to glass)
    if (dir === 'forward') {
      pwm.setDutyCycle(4, speed);
      console.log('Forward with speed: ', speed, 'Pump: ', pump);
    }

    if (dir === 'backward') {
      // pwm.setDutyCycle(0, speed);//UPDATE CHANEL
      console.log('Backward with speed: ', speed, 'Pump: ', pump);
    }

    if (dur !== 0) {
      setTimeout(function () {
        dosingPumpStop(pump, dur, new Date());
      }, dur);
    }
  }

  if (pump === 'd-pump-5') {
    // Main room temp water pump (from bottle to glass)
    if (dir === 'forward') {
      pwm.setDutyCycle(5, speed);
      console.log('Forward with speed: ', speed, 'Pump: ', pump);
    }

    if (dir === 'backward') {
      // pwm.setDutyCycle(0, speed);//UPDATE CHANEL
      console.log('Backward with speed: ', speed, 'Pump: ', pump);
    }

    if (dur !== 0) {
      setTimeout(function () {
        dosingPumpStop(pump, dur, new Date());
      }, dur);
    }
  }

  if (pump === 'd-pump-6') {
    // Main room temp water pump (from bottle to glass)
    if (dir === 'forward') {
      pwm.setDutyCycle(6, speed);
      console.log('Forward with speed: ', speed, 'Pump: ', pump);
    }

    if (dir === 'backward') {
      // pwm.setDutyCycle(0, speed);//UPDATE CHANEL
      console.log('Backward with speed: ', speed, 'Pump: ', pump);
    }

    if (dur !== 0) {
      setTimeout(function () {
        dosingPumpStop(pump, dur, new Date());
      }, dur);
    }
  }

  if (pump === 'water-cooler') {
    // Main room temp water pump (from bottle to glass)
    if (dir === 'forward') {
      pwm.setDutyCycle(7, speed);
      console.log('Forward with speed: ', speed, 'Pump: ', pump);
    }

    if (dir === 'backward') {
      // pwm.setDutyCycle(0, speed);//UPDATE CHANEL
      console.log('Backward with speed: ', speed, 'Pump: ', pump);
    }

    if (dur !== 0) {
      setTimeout(function () {
        dosingPumpStop(pump, dur, new Date());
      }, dur);
    }
  } // Logging


  var funct = _callerId["default"].getData().functionName;

  (0, _couch.writeLog)('Pump', '', funct, {
    pump: pump,
    dir: dir,
    speed: speed,
    dur: dur
  });
  return false;
};

exports.dosingPump = dosingPump;