"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _dotenv = require("dotenv");

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var _process$env = process.env,
    CLIENT_ID = _process$env.CLIENT_ID,
    SERVER_BASE_URL = _process$env.SERVER_BASE_URL;


var spotifyAuthUrl = function spotifyAuthUrl() {
  return "https://accounts.spotify.com/authorize?client_id=" + CLIENT_ID + "&redirect_uri=" + SERVER_BASE_URL + "/connect-spotify&response_type=code&state=" + "hey";
};

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            res.send("<a\n      href=\"" + spotifyAuthUrl() + "\"\n      target=\"_blank\"\n      style=\"color: rgb(194, 201, 207);\"\n    >\n      connect spotify\n    </a>").status(200);

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();