"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _nowPlaying = require("../spotify/now-playing");

var _nowPlaying2 = _interopRequireDefault(_nowPlaying);

var _server = require("react-dom/server");

var _player = require("./ui/player");

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fetch = require("node-fetch");

var base64ImageFromUrl = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(imageUrl) {
    var buff;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!imageUrl) {
              _context.next = 7;
              break;
            }

            _context.next = 3;
            return fetch(imageUrl);

          case 3:
            _context.next = 5;
            return _context.sent.arrayBuffer();

          case 5:
            buff = _context.sent;
            return _context.abrupt("return", "data:image/jpeg;base64," + Buffer.from(buff).toString("base64"));

          case 7:
            return _context.abrupt("return", null);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function base64ImageFromUrl(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res, next) {
    var username, _ref3, payload, imageUrl, text;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            username = req.params.id;
            _context2.next = 4;
            return (0, _nowPlaying2.default)(username);

          case 4:
            _ref3 = _context2.sent;
            payload = _ref3.payload;
            imageUrl = payload.imageUrl;


            res.setHeader("Content-Type", "image/svg+xml");
            res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate");

            _context2.t0 = _server.renderToString;
            _context2.t1 = _player2.default;
            _context2.next = 13;
            return base64ImageFromUrl(imageUrl);

          case 13:
            _context2.t2 = _context2.sent;
            _context2.t3 = payload.artist;
            _context2.t4 = payload.title;
            _context2.t5 = payload.progress;
            _context2.t6 = payload.duration;
            _context2.t7 = {
              cover: _context2.t2,
              artist: _context2.t3,
              track: _context2.t4,
              isPlaying: true,
              progress: _context2.t5,
              duration: _context2.t6
            };
            _context2.t8 = (0, _context2.t1)(_context2.t7);
            text = (0, _context2.t0)(_context2.t8);

            res.status(200).send(text);
            _context2.next = 27;
            break;

          case 24:
            _context2.prev = 24;
            _context2.t9 = _context2["catch"](0);

            res.send(_context2.t9);

          case 27:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 24]]);
  }));

  return function (_x2, _x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();