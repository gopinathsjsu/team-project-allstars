const express = require("express");
const config = require("../../utils/config");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");


// Initializing Router
const router = express.Router();

//-------------Show Reservations -------------------
const mongoose= require('mongoose');
const reservationModel = require("../../models/reservationModel");
const passengerModel = require("../../models/passengerModel");



router.post("/:flightID/:_id",async (req, res) => {
    const flightId = req.params.flightId;
    const passengerId = req.params._id;
    try{
        await reservationModel.findOneAndUpdate({
            flightId: flightId,
            passengerId:passengerId
        },
        {   
            reservationStatus:"Cancelled"
            //Mileage rewards yet to be implemented
        }
        )
        res.status(202).json({flightId: flightId, message : "Reservation cancelled"});

    } catch (error) {
        res.status(401).json({message: error.message});
    }
    
});


module.exports = router;