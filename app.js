require("dotenv").config();

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const mongoBD = process.env.MONGO_URL;
const db = mongoose.connection;
mongoose.connect(mongoBD, { useUnifiedTopology: true, useNewUrlParser: true });
db.on("error", console.error.bind(console, "MongoDB connection error"));
const passport = require("passport");
const session = require("express-session");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
let homeRouter = require("./routes/home");

var app = express();

require("./config/passport")(passport);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


app.use(session({ secret: "secret", resave: false, saveUninitialized: true, }));
app.use(passport.initialize());
app.use(passport.session());

// makes the user global to all views
app.use(function (req, res, next) {
  res.locals.login = req.isAuthenticated();
  res.locals.user = req.user;
  next();
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/", homeRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
