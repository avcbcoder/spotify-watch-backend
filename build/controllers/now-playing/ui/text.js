"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sizes = {
  default: 14,
  small: 12
};

var colors = {
  default: "#24292e",
  "gray-light": "#e1e4e8",
  gray: "#586069",
  "gray-dark": "#24292e"
};

var families = {
  default: "-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji",
  mono: "SFMono-Regular,Consolas,Liberation Mono,Menlo,monospace"
};

var weights = {
  default: 400,
  bold: 600
};

var Text = function Text(_ref) {
  var _ref$children = _ref.children,
      children = _ref$children === undefined ? "" : _ref$children,
      _ref$weight = _ref.weight,
      weight = _ref$weight === undefined ? "default" : _ref$weight,
      _ref$family = _ref.family,
      family = _ref$family === undefined ? "default" : _ref$family,
      _ref$color = _ref.color,
      color = _ref$color === undefined ? "default" : _ref$color,
      _ref$size = _ref.size,
      size = _ref$size === undefined ? "default" : _ref$size,
      props = (0, _objectWithoutProperties3.default)(_ref, ["children", "weight", "family", "color", "size"]);

  return _react2.default.createElement(
    "p",
    (0, _extends3.default)({
      style: {
        whiteSpace: "pre",
        fontSize: sizes[size] + "px",
        lineHeight: 1.5,
        fontFamily: families[family],
        color: colors[color],
        fontWeight: weights[weight]
      }
    }, props),
    children
  );
};

exports.default = Text;