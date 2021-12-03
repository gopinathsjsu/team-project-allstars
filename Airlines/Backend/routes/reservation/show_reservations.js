const express = require("express");
const config = require("../../utils/config");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

// Initializing Router
const router = express.Router();

//-------------Show Reservations -------------------
const mongoose = require("mongoose");
const reservationModel = require("../../models/reservationModel");
const passengerModel = require("../../models/passengerModel");

router.get("/:_id", async (req, res) => {
	const passengerId = req.params._id;
	console.log("passengerId", passengerId);
	try {
		const getReservationList = await reservationModel.find({
			bookedBy: passengerId,
		});
		if (getReservationList && getReservationList.length > 0) {
			res.writeHead(200, {
				"Content-Type": "text/plain",
			});
			res.end(JSON.stringify(getReservationList));
		} else {
			res.writeHead(404, {
				"Content-Type": "text/plain",
			});
			res.end("NO_DATA");
		}
	} catch (error) {
		res.writeHead(500, {
			"Content-Type": "text/plain",
		});
		res.end("INTERNAL_ERROR");
	}
});

module.exports = router;
