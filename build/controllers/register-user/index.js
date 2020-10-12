"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _firstTimeTokens = require("../spotify/first-time-tokens");

var _firstTimeTokens2 = _interopRequireDefault(_firstTimeTokens);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
    var _req$query, error, code, state, username, _ref2, _error;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$query = req.query, error = _req$query.error, code = _req$query.code, state = _req$query.state;
            username = state;

            if (!(error || !code || !state)) {
              _context.next = 6;
              break;
            }

            res.send("unable to connect with spotify, try again! ").status(200);
            _context.next = 11;
            break;

          case 6:
            _context.next = 8;
            return (0, _firstTimeTokens2.default)({ username: username, code: code });

          case 8:
            _ref2 = _context.sent;
            _error = _ref2.error;

            if (_error) res.send("couldn't connect to spotify, Try again").status(200);else {
              res.send("successfully connected to spotify").status(200);
            }

          case 11:
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