import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import http from "http";
import routes from "./routes";
import bodyParser from "body-parser";

dotenv.config();

const {
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  SESSION_SECRET,
  SESSION_NAME,
} = process.env;

const PORT = process.env.PORT;

var COOKIE_SECRET = SESSION_SECRET;
var COOKIE_NAME = SESSION_NAME;

const sessionStore = new expressSession.MemoryStore();

const session = expressSession({
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
    path: "/",
  },
});

/**
 * Middlewares before routes, as these are called in order one after another
 * before going to the routes
 */
const app = express();

app.set("trust proxy", 1); // trust first proxy

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(session);
app.use(cookieParser(COOKIE_SECRET));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  next();
});

app.use(routes);

app.use(express.static(__dirname + '/public'));

app.get('*', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

// connect to mlab db
const uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.gchpc.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected to mlab db");
  }
);

const server = http.Server(app);

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
