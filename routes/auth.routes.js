"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var authRouter = (0, _express.Router)(); // Sign up a new user

authRouter.post('/signup', function (req, res) {
  res.send('user signup');
});
var _default = authRouter;
exports["default"] = _default;