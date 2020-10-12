"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _querystring = require("querystring");

var _querystring2 = _interopRequireDefault(_querystring);

var _dotenv = require("dotenv");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _dotenv.config)();

var CLIENT_ID = process.env.CLIENT_ID;
var CLIENT_SECRET = process.env.CLIENT_SECRET;

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(currentTokens) {
    var url, requestBody, header, axiosResponse, data, tokens;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            url = "https://accounts.spotify.com/api/token";
            requestBody = {
              grant_type: "refresh_token",
              refresh_token: currentTokens.refreshToken,
              client_id: CLIENT_ID,
              client_secret: CLIENT_SECRET
            };
            header = {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              }
            };
            _context.prev = 3;
            _context.next = 6;
            return _axios2.default.post(url, _querystring2.default.stringify(requestBody), header);

          case 6:
            axiosResponse = _context.sent;
            data = axiosResponse.data;
            tokens = {
              accessToken: data.access_token,
              expiresIn: data.expires_in,
              refreshToken: data.refresh_token ? data.refresh_token : currentTokens.refreshToken,
              lastModified: new Date().getTime(),
              tokenType: data.token_type ? data.token_type : currentTokens.tokenType
            };
            return _context.abrupt("return", { error: false, payload: tokens });

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](3);
            return _context.abrupt("return", { error: true });

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[3, 12]]);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();