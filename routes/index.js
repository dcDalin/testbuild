"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "authRouter", {
  enumerable: true,
  get: function get() {
    return _auth["default"];
  }
});
Object.defineProperty(exports, "wifiRouter", {
  enumerable: true,
  get: function get() {
    return _wifi["default"];
  }
});
Object.defineProperty(exports, "setupRouter", {
  enumerable: true,
  get: function get() {
    return _setup["default"];
  }
});
Object.defineProperty(exports, "pumpRouter", {
  enumerable: true,
  get: function get() {
    return _pump["default"];
  }
});

var _auth = _interopRequireDefault(require("./auth.routes"));

var _wifi = _interopRequireDefault(require("./wifi.routes"));

var _setup = _interopRequireDefault(require("./setup.routes"));

var _pump = _interopRequireDefault(require("./pump.routes"));