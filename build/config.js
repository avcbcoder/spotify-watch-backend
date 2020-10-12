"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var IS_DEPLOYED = false;
var BASE_URL = IS_DEPLOYED ? "https://av-nowplaying.herokuapp.com" : "http://localhost:7000";
var REDIRECT_URI = BASE_URL + "/register-user";

exports.REDIRECT_URI = REDIRECT_URI;