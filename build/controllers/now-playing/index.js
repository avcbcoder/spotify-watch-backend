"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _nowPlaying = require("../spotify/now-playing");

var _nowPlaying2 = _interopRequireDefault(_nowPlaying);

var _server = require("react-dom/server");

var _player = require("./ui/player");

var _player2 = _interopRequireDefault(_player);

var _history = require("./history");

var _history2 = _interopRequireDefault(_history);

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

var renderImage = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(res, payload) {
    var imageUrl, artist, track, isPlaying, progress, duration, cover, text;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            imageUrl = payload.imageUrl, artist = payload.artist, track = payload.title, isPlaying = payload.isPlaying, progress = payload.progress, duration = payload.duration;


            res.setHeader("Content-Type", "image/svg+xml");
            res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate");

            _context2.next = 5;
            return base64ImageFromUrl(imageUrl);

          case 5:
            cover = _context2.sent;
            text = (0, _server.renderToString)((0, _player2.default)({
              cover: cover,
              artist: artist,
              track: track,
              isPlaying: isPlaying,
              progress: progress,
              duration: duration
            }));

            res.status(200).send(text);

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function renderImage(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

exports.default = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res, next) {
    var username, payload, _ref4, parsedTrack, _ref5, lastPlayedInHistory;

    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            username = req.params.id;
            payload = ""; //default

            _context3.next = 5;
            return (0, _nowPlaying2.default)(username);

          case 5:
            _ref4 = _context3.sent;
            parsedTrack = _ref4.payload;

            console.log(payload);

            if (!parsedTrack) {
              _context3.next = 13;
              break;
            }

            // if a song is being played - set payload and save to history
            payload = parsedTrack;
            // dont use await - since it should be saved in bkg
            _history2.default.set({ username: username, payload: parsedTrack });
            _context3.next = 18;
            break;

          case 13:
            _context3.next = 15;
            return _history2.default.get({ username: username });

          case 15:
            _ref5 = _context3.sent;
            lastPlayedInHistory = _ref5.payload;

            if (lastPlayedInHistory) payload = (0, _extends3.default)({}, lastPlayedInHistory, { isPlaying: false });

          case 18:

            // if neither a song is being played nor we have history in db
            payload = payload || {
              progress: 40,
              title: "No track playing",
              album: "N/A",
              imageUrl: "https://raw.githubusercontent.com/avcbcoder/avcbcoder/master/images/logo.png",
              artist: "N/A",
              duration: 100
            };

            _context3.next = 21;
            return renderImage(res, payload);

          case 21:
            _context3.next = 26;
            break;

          case 23:
            _context3.prev = 23;
            _context3.t0 = _context3["catch"](0);

            res.send(_context3.t0);

          case 26:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[0, 23]]);
  }));

  return function (_x4, _x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();