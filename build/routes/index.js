"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _nowPlaying = require("../controllers/now-playing");

var _nowPlaying2 = _interopRequireDefault(_nowPlaying);

var _registerUser = require("../controllers/register-user");

var _registerUser2 = _interopRequireDefault(_registerUser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();

router.get("/register-user", _registerUser2.default);
router.get("/now-playing/:id", _nowPlaying2.default);

exports.default = router;