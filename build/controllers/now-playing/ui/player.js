"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _coverImage = require("./cover-image");

var _coverImage2 = _interopRequireDefault(_coverImage);

var _text = require("./text");

var _text2 = _interopRequireDefault(_text);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var cover = _ref.cover,
      track = _ref.track,
      artist = _ref.artist,
      progress = _ref.progress,
      duration = _ref.duration,
      isPlaying = _ref.isPlaying;

  return _react2.default.createElement(
    _coverImage2.default,
    { width: "256", height: "64" },
    _react2.default.createElement(
      "style",
      null,
      "\n            .paused { \n              animation-play-state: paused !important;\n              background: #e1e4e8 !important;\n            }\n            img:not([src]) {\n              content: url(\"data:image/gif;base64,R0lGODlhAQABAPAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==\");\n              border-radius: 6px;\n              background: #FFF;\n              border: 1px solid #e1e4e8;\n            }\n            p {\n              display: block;\n              opacity: 0;\n            }\n            .progress-bar {\n              position: relative;\n              width: 100%;\n              height: 4px;\n              margin: -1px;\n              border: 1px solid #e1e4e8;\n              border-radius: 4px;\n              overflow: hidden;\n              padding: 2px;\n              z-index: 0;\n            }\n            #progress {\n              position: absolute;\n              top: -1px;\n              left: 0;\n              width: 100%;\n              height: 6px;\n              transform-origin: left center;\n              background-color: #24292e;\n              animation: progress " + duration + "ms linear;\n              animation-delay: -" + progress + "ms;\n            }\n            \n            .progress-bar,\n            #track,\n            #artist,\n            #cover {\n              opacity: 0;\n              animation: appear 300ms ease-out forwards;\n            }\n            #track {\n              animation-delay: 400ms;\n            }\n            #artist {\n              animation-delay: 500ms;\n            }\n            .progress-bar {\n              animation-delay: 550ms;\n              margin-top: 4px;\n            }\n            #cover {\n              animation-name: cover-appear;\n              animation-delay: 300ms;\n              box-shadow: 0 1px 3px rgba(0,0,0,0.1), 0 3px 10px rgba(0,0,0,0.05);\n            }\n            #cover:not([src]) {\n              box-shadow: none;\n            }\n            @keyframes cover-appear {\n              from {\n                opacity: 0;\n                transform: scale(0.8);\n              }\n              to {\n                opacity: 1;\n                transform: scale(1);\n              }\n            }\n            @keyframes appear {\n              from {\n                opacity: 0;\n                transform: translateX(-8px);\n              }\n              to {\n                opacity: 1;\n                transform: translateX(0);\n              }\n            }\n            @keyframes progress {\n              from {\n                transform: scaleX(0)\n              }\n              to {\n                transform: scaleX(1)\n              }\n            }\n        "
    ),
    _react2.default.createElement(
      "div",
      {
        className: isPlaying ? "disabled" : "",
        style: {
          display: "flex",
          alignItems: "center",
          paddingTop: 8,
          paddingLeft: 4
        }
      },
      _react2.default.createElement("img", { id: "cover", src: cover || null, width: "48", height: "48" }),
      _react2.default.createElement(
        "div",
        {
          style: {
            display: "flex",
            flex: 1,
            flexDirection: "column",
            marginTop: -4,
            marginLeft: 8
          }
        },
        _react2.default.createElement(
          _text2.default,
          { id: "track", weight: "bold" },
          ((track || "") + " ").trim()
        ),
        _react2.default.createElement(
          _text2.default,
          { id: "artist", color: !track ? "gray" : undefined },
          artist || "Nothing playing..."
        ),
        track && _react2.default.createElement(
          "div",
          { className: "progress-bar" },
          _react2.default.createElement("div", { id: "progress", className: !isPlaying ? "paused" : "" })
        )
      )
    )
  );
};