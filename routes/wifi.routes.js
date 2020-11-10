"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var wifi = _interopRequireWildcard(require("../actions/wifi.actions"));

var wifiRouter = (0, _express.Router)(); // scan for wifi networks

wifiRouter.get('/scan', wifi.wifiScan); // get a list of all available wifi networks

wifiRouter.get('/get', wifi.wifiList); // connect to wifi network

wifiRouter.get('/connect', wifi.wifiConnect);
var _default = wifiRouter;
exports["default"] = _default;