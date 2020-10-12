"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _users = require("../../models/users");

var _users2 = _interopRequireDefault(_users);

var _refreshToken = require("./refresh-token");

var _refreshToken2 = _interopRequireDefault(_refreshToken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(username) {
    var user, tokens, oldTokens, timeElapsed, refreshNeeded, _ref2, refreshError, newTokens;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (username) {
              _context.next = 2;
              break;
            }

            throw "Invalid username";

          case 2:
            _context.next = 4;
            return _users2.default.findOne({ username: username });

          case 4:
            user = _context.sent;

            if (user) {
              _context.next = 7;
              break;
            }

            throw "Invalid username";

          case 7:
            tokens = {};
            oldTokens = user.spotify;

            // refresh needed?

            timeElapsed = new Date().getTime() - oldTokens.lastModified; // in millisec

            refreshNeeded = timeElapsed > (oldTokens.expiresIn - 10) * 1000;

            if (refreshNeeded) {
              _context.next = 15;
              break;
            }

            tokens = oldTokens;
            _context.next = 24;
            break;

          case 15:
            _context.next = 17;
            return (0, _refreshToken2.default)(oldTokens);

          case 17:
            _ref2 = _context.sent;
            refreshError = _ref2.error;
            newTokens = _ref2.payload;

            if (!refreshError) {
              _context.next = 22;
              break;
            }

            throw refreshError;

          case 22:
            tokens = newTokens;
            // save new tokens to user in background
            _users2.default.updateOne({ username: username }, { $set: { spotify: newTokens } });

          case 24:
            return _context.abrupt("return", tokens);

          case 25:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();