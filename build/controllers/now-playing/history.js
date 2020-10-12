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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * get last played track payload from history
 */
var get = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref2) {
    var username = _ref2.username;
    var user, lastPlayedTrack;
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
              _context.next = 6;
              break;
            }

            throw "Invalid username";

          case 6:
            lastPlayedTrack = user.history;
            return _context.abrupt("return", { payload: lastPlayedTrack });

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", { error: _context.t0 });

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 10]]);
  }));

  return function get(_x) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * set last played track to history
 */
var set = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(_ref4) {
    var username = _ref4.username,
        lastPlayedTrack = _ref4.payload;
    var user;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _users2.default.findOne({ username: username });

          case 3:
            user = _context2.sent;

            if (user) {
              _context2.next = 6;
              break;
            }

            throw "Invalid username";

          case 6:
            _context2.next = 8;
            return _users2.default.updateOne({ username: username }, { $set: { history: lastPlayedTrack } });

          case 8:
            return _context2.abrupt("return", { payload: true });

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", { error: _context2.t0 });

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 11]]);
  }));

  return function set(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

exports.default = { get: get, set: set };