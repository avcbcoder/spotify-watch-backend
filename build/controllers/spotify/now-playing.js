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

var _getTokens = require("./get-tokens");

var _getTokens2 = _interopRequireDefault(_getTokens);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Parse data returned by spotify/currently-playing endpoint
 */
var parseResponse = function parseResponse(data) {
  var progress_ms = data.progress_ms,
      _data$item = data.item,
      name = _data$item.name,
      artistsArr = _data$item.artists,
      album = _data$item.album,
      duration_ms = _data$item.duration_ms;

  var artistName = artistsArr[0].name;
  var albumName = album.name;

  var images = album.images;
  var imageUrl = "";
  if (images.length >= 2) imageUrl = images[1].url;else if (images.length >= 1) imageUrl = images[0].url;

  return {
    progress: progress_ms,
    title: name,
    album: albumName,
    imageUrl: imageUrl,
    artist: artistName,
    duration: duration_ms
  };
};

/**
 * Hit spotify/currently-playing endpoint using token saved in db
 */

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(username) {
    var tokens, accessToken, apiEndpoint, headers, _ref2, data;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _getTokens2.default)(username);

          case 3:
            tokens = _context.sent;
            accessToken = tokens.accessToken;
            apiEndpoint = "https://api.spotify.com/v1/me/player/currently-playing";
            headers = {
              Authorization: "Bearer " + accessToken
            };
            _context.next = 9;
            return _axios2.default.get(apiEndpoint, { headers: headers });

          case 9:
            _ref2 = _context.sent;
            data = _ref2.data;
            return _context.abrupt("return", { payload: parseResponse(data) });

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", { error: "someting went wrong" });

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 14]]);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();