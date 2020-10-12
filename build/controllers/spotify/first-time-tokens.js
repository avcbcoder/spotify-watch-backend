"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _querystring = require("querystring");

var _querystring2 = _interopRequireDefault(_querystring);

var _dotenv = require("dotenv");

var _users = require("../../models/users");

var _users2 = _interopRequireDefault(_users);

var _config = require("../../config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * UPDATE : redirect_uri for deployment
 *
 */

(0, _dotenv.config)();

var CLIENT_ID = process.env.CLIENT_ID;
var CLIENT_SECRET = process.env.CLIENT_SECRET;

/**
 * @param {authCode} : got in first step
 */

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref2) {
    var username = _ref2.username,
        code = _ref2.code;

    var user, newUser, spotifyTokenEndpoint, requestBody, header, _ref3, data, newTokens, _user, spotify, spotifyObj;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _users2.default.findOne({ username: username });

          case 3:
            user = _context.sent;

            if (user) {
              _context.next = 11;
              break;
            }

            newUser = new _users2.default({
              username: username
            });
            _context.next = 8;
            return newUser.save();

          case 8:
            _context.next = 10;
            return _users2.default.findOne({ username: username });

          case 10:
            user = _context.sent;

          case 11:
            spotifyTokenEndpoint = "https://accounts.spotify.com/api/token";
            requestBody = {
              grant_type: "authorization_code",
              code: code,
              redirect_uri: _config.REDIRECT_URI,
              client_id: CLIENT_ID,
              client_secret: CLIENT_SECRET
            };
            header = {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              }
            };
            _context.next = 16;
            return _axios2.default.post(spotifyTokenEndpoint, _querystring2.default.stringify(requestBody), header);

          case 16:
            _ref3 = _context.sent;
            data = _ref3.data;
            newTokens = {
              accessToken: data.access_token,
              expiresIn: data.expires_in,
              refreshToken: data.refresh_token,
              lastModified: new Date().getTime(),
              tokenType: data.token_type
            };

            // set newTokens to user

            _user = user, spotify = _user.spotify;
            spotifyObj = (0, _extends3.default)({}, spotify, newTokens);
            _context.next = 23;
            return _users2.default.updateOne({ username: username }, { $set: { spotify: spotifyObj } });

          case 23:
            return _context.abrupt("return", { payload: true });

          case 26:
            _context.prev = 26;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", { error: true });

          case 29:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 26]]);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();