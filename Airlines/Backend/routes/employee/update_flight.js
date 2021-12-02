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

const flightModel = require("../../models/flightModel");

router.post("/:flightName", async (req, res) => {
  console.log("inside update flight");
  console.log("req.body", req.body);
  const flightName = req.params.flightName;
  try {
    await flightModel.findOneAndUpdate(
      {
        flightName: flightName,
      },
      {
        departureFrom: req.body.departureFrom,
        arrivalAt: req.body.arrivalAt,
        flightStatus: req.body.flightStatus,
        arrivalDate: req.body.arrivalDate,
        departureDate: req.body.departureDate,
        economySeatsCapacity:req.body.economySeatsCapacity,
        businessSeatsCapacity:req.body.businessSeatsCapacity,
        economySeatPrice: req.body.economySeatPrice,
        businessSeatPrice: req.body.businessSeatPrice,
      }
    );


    res
      .status(202)
      .json({ flightName: flightName, message: "Succesfully updated" });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

module.exports = router;
