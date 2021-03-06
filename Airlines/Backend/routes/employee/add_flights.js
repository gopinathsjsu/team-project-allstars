const express = require("express");
const config = require("../../utils/config");
const bcrypt = require("bcrypt");
const employeeModel = require("../../models/employeeModel");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { capitalizeFirstLetter } = require("../../helper/utils");

// Initializing Router
const router = express.Router();

//-------------Sindhana Changes -------------------
const mongoose = require("mongoose");
const flightModel = require("../../models/flightModel");

router.post("/", async (req, res) => {
	console.log(req.body);

	const ecoCap = 52;
	const busiCap = 20;
	const ecoSeatsBooked = [];
	const busiSeatsBooked = [];
	for (var i = 0; i < ecoCap; i++) {
		ecoSeatsBooked.push("false");
	}
	console.log(ecoSeatsBooked);

	for (var i = 0; i < busiCap; i++) {
		busiSeatsBooked.push("false");
	}
	console.log(busiSeatsBooked);
	const newflight = new flightModel({
		flightName: req.body.flightName,
		departureFrom: req.body.departureFrom.toLowerCase(),
		arrivalAt: req.body.arrivalAt.toLowerCase(),
		flightStatus: req.body.flightStatus,
		arrivalDate: req.body.arrivalDate,
		departureDate: req.body.departureDate,
		economySeatsCapacity: 52,
		economySeatsBooked: ecoSeatsBooked,
		businessSeatsCapacity: 20,
		businessSeatsBooked: busiSeatsBooked,
		economySeatPrice: req.body.economySeatPrice,
		businessSeatPrice: req.body.businessSeatPrice,
		departureTime: req.body.departureTime,
		arrivalTime: req.body.arrivalTime,
	});
	try {
		await newflight.save();

		res.status(201).json(newflight);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

module.exports = router;
