"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _dotenv = require("dotenv");

var _dotenv2 = _interopRequireDefault(_dotenv);

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

var _cookieParser = require("cookie-parser");

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _expressSession = require("express-session");

var _expressSession2 = _interopRequireDefault(_expressSession);

var _http = require("http");

var _http2 = _interopRequireDefault(_http);

var _routes = require("./routes");

var _routes2 = _interopRequireDefault(_routes);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var _process$env = process.env,
    DB_USER = _process$env.DB_USER,
    DB_PASSWORD = _process$env.DB_PASSWORD,
    DB_NAME = _process$env.DB_NAME,
    SESSION_SECRET = _process$env.SESSION_SECRET,
    SESSION_NAME = _process$env.SESSION_NAME;


var PORT = process.env.PORT || 7000;

var COOKIE_SECRET = SESSION_SECRET;
var COOKIE_NAME = SESSION_NAME;

var sessionStore = new _expressSession2.default.MemoryStore();

var session = (0, _expressSession2.default)({
  name: COOKIE_NAME,
  secret: COOKIE_SECRET,
  // store: sessionStore,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 5 * 24 * 60 * 60 * 1000,
    secure: true, // false->cookies will be accessible only on http and if true->https
    sameSite: "None", // can be set by this domain only
    httpOnly: false, // cookie cant be seen on client side using document.cookie
    path: "/"
  }
});

/**
 * Middlewares before routes, as these are called in order one after another
 * before going to the routes
 */
var app = (0, _express2.default)();

app.set("trust proxy", 1); // trust first proxy

app.use((0, _cors2.default)());
app.use(_express2.default.urlencoded({ extended: false }));
app.use(session);
app.use((0, _cookieParser2.default)(COOKIE_SECRET));
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  next();
});

app.use(_routes2.default);

app.use(_express2.default.static(__dirname + "/public"));

app.get("*", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

// connect to mlab db
var uri = "mongodb+srv://" + DB_USER + ":" + DB_PASSWORD + "@cluster0.gchpc.mongodb.net/" + DB_NAME + "?retryWrites=true&w=majority";
_mongoose2.default.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, function () {
  console.log("connected to mlab db");
});

var server = _http2.default.Server(app);

server.listen(PORT, function () {
  return console.log("Listening on port " + PORT);
});