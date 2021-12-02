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


router.get('/:_id', async (req, res) => {
    const passengerId = req.params._id;
    try {
        const getReservationList= await reservationModel.find({bookedBy:passengerId,});
        //new ObjectID(passengerId)
        
        res.status(200).json({getReservationList,message :"Success"});
    } catch(error) {
        res.status(404).json({message: error.message});
    }
});

module.exports = router;