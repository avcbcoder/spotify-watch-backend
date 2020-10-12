"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReadmeImg = function ReadmeImg(_ref) {
  var width = _ref.width,
      height = _ref.height,
      children = _ref.children;

  return _react2.default.createElement(
    "svg",
    {
      fill: "none",
      width: width,
      height: height,
      viewBox: "0 0 " + width + " " + height,
      xmlns: "http://www.w3.org/2000/svg"
    },
    _react2.default.createElement(
      "foreignObject",
      { width: width, height: height },
      _react2.default.createElement(
        "div",
        { xmlns: "http://www.w3.org/1999/xhtml" },
        _react2.default.createElement(
          "style",
          null,
          "\n              * {\n                margin: 0;\n                box-sizing: border-box;\n              }\n            "
        ),
        children
      )
    )
  );
};

exports.default = ReadmeImg;