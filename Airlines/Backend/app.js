"use strict";
var express = require("express");
var app = express();
var cors = require("cors");
var cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const passengerSignup = require("./routes/passenger/signup.js");
const passengerLogin = require("./routes/passenger/login.js");

const { frontendURI } = require("./utils/config");
app.use(express.static(__dirname + "public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: frontendURI, credentials: true }));
app.use(bodyParser.json());

//Allow Access Control
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", frontendURI);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

//adding routes
app.use("/passenger/signup", passengerSignup);
app.use("/passenger/login", passengerLogin);

module.exports = app;
