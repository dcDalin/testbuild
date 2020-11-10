"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var pump = _interopRequireWildcard(require("../actions/pump.actions"));

var pumpRouter = (0, _express.Router)(); // scan for pump networks

pumpRouter.get('/start', pump.startPump);
pumpRouter.get('/stop', pump.stopPump);
pumpRouter.get('/logs', pump.allLogs);
var _default = pumpRouter;
exports["default"] = _default;