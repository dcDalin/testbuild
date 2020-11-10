"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var cache = {};

var env = function env(key, defaultValue) {
  if (!(key in process.env)) {
    if (defaultValue) return defaultValue;
    throw new Error("".concat(key, " not found in process.env!"));
  }

  if (cache[key]) return cache[key];
  cache[key] = process.env[key];
  return process.env[key];
};

var _default = env;
exports["default"] = _default;