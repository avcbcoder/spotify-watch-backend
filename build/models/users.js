"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserSchema = _mongoose2.default.Schema({
  username: {
    type: String,
    required: true
  },
  spotify: {
    type: JSON,
    required: false,
    default: {}
  },
  history: {
    type: JSON,
    required: false,
    default: {}
  }
});

exports.default = _mongoose2.default.model("users", UserSchema);