"use strict";
var express = require("express");
var app = express();
var cors = require("cors");
var cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const passengerSignup = require("./routes/passenger/signup.js");
const passengerLogin = require("./routes/passenger/login.js");
const employeeSignup = require("./routes/employee/signup.js");
const employeeLogin = require("./routes/employee/login.js");
const flightSearch = require("./routes/flight/search.js");
const reservation = require("./routes/passenger/reservation");

//Employee adding flight
const employeeAddFlight = require("./routes/employee/add_flights.js");
const employeeUpdateFlight = require("./routes/employee/update_flight.js");
const employeeShowFlight = require("./routes/employee/show_flights.js");
const employeeDeleteFlight = require("./routes/employee/delete_flight.js");

const getSeatCount = require("./routes/flight/getSeatCount.js");
//Show and cancel Reservation
const showReservation = require("./routes/reservation/show_reservations.js");
const cancelReservation = require("./routes/reservation/cancel_reservation.js");
const updateReservation = require("./routes/reservation/updateReservation");

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
app.use("/employee/signup", employeeSignup);
app.use("/employee/login", employeeLogin);

//Employee adding flight
app.use("/employee/addFlights", employeeAddFlight);
app.use("/employee/updateFlight", employeeUpdateFlight);
app.use("/employee/showFlights", employeeShowFlight);
app.use("/employee/deleteFlight", employeeDeleteFlight);
app.use("/flight/search", flightSearch);
app.use("/passenger/reservation", reservation);

app.use("/flight/getseatcount", getSeatCount);
//Show and cancel Reservation
app.use("/reservation/showReservation", showReservation);
app.use("/reservation/cancelReservation", cancelReservation);
app.use("/reservation/update", updateReservation);

module.exports = app;
