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
const mongoose= require('mongoose');
const flightModel = require("../../models/flightModel");

router.post("/", async (req, res) => {
    console.log(req.body);
    const newflight = new flightModel({
        flightName:req.body.flightName,
        departureFrom:req.body.departureFrom,
        arrivalAt:req.body.arrivalAt,
        flightStatus:req.body.flightStatus,
        arrivalDate:req.body.arrivalDate,
        departureDate:req.body.departureDate,
        economySeatsCapacity:req.body.economySeatsCapacity,
        businessSeatsCapacity:req.body.businessSeatsCapacity,
        economySeatPrice:req.body.economySeatPrice,
        businessSeatPrice:req.body.businessSeatPrice

    })
    try {
        await newflight.save();

        res.status(201).json(newflight);
        

    } catch(error) {
        res.status(400).json({ message : error.message});
    }

});

module.exports = router;