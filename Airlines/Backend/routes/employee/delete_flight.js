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

router.delete("/:flightName",async (req, res) => {
    const flightName= req.params.flightName;
  

    try {
        const flightFound = await flightModel.findOne({flightName: flightName});
        console.log(flightFound);
        if(flightFound!=null){
        await flightModel.findOneAndRemove({flightName: flightName});
        res.status(203).json({message : "Succesfully deleted"});
        }
        else
        {
            res.status(400).json({message: "This flight doesnt exist in the database"});
        }

    }catch(error) {
        res.status(402).json({message: error.message});
    }
});

module.exports = router;