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


router.get('/', async (req, res) => {
    try {
        const getFlights= await flightModel.find();
        
        res.status(200).json(getFlights);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
});

module.exports = router;