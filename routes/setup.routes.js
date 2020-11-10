"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var setup = _interopRequireWildcard(require("../actions/setup.actions"));

var setupRouter = (0, _express.Router)(); // post a new setup

setupRouter.post('/new', setup.setupNew); // check setup status

setupRouter.get('/status', setup.setupStatus);
var _default = setupRouter;
exports["default"] = _default;