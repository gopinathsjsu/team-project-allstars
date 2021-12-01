const express = require("express");
const Joi = require("joi");
const passengerModel = require("../../models/passengerModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  checkIfEmailIsAlreadyUsedByPassenger,
  capitalizeFirstLetter,
} = require("../../helper/utils");
const config = require("../../utils/config");

// Initializing Router
const router = express.Router();

// User SignUp API
router.post("/", async (req, res) => {
  const schema = Joi.object({
    passengerName: Joi.string()
      .required()
      .max(64)
      .regex(/^[a-zA-Z ]*$/)
      .messages({
        "any.required": "Enter a valid name.",
        "string.empty": "Enter a valid name.",
        "string.pattern.base": "Enter a valid name",
        "string.max": "Length of the name should not exceed 64 characters",
      }),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required()
      .messages({
        "string.email": "Enter a valid email.",
        "string.empty": "Enter a valid email.",
        "any.required": "Enter a valid email.",
      }),
    password: Joi.string().required().messages({
      "string.empty": "Password is required.",
      "any.required": "Password is required.",
    }),
  });

  // Validating schema for the input fields
  const result = await schema.validate(req.body);
  if (result.error) {
    res.status(400).send({ errorMessage: result.error.details[0].message });
    return;
  }

  // Check whether this email is used by passenger or not
  const isEmailUsed = await checkIfEmailIsAlreadyUsedByPassenger(
    req.body.email
  );
  if (isEmailUsed) {
    res.status(400).send({
      errorMessage: "Account belonging to this email already exists.",
    });
    return;
  } else {
    // Create passenger
    const passengerName = req.body.passengerName;
    const email = req.body.email;
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt());
    const passengerObject = {
      passengerName: passengerName,
      email: email,
      password: hashedPassword,
      type: "PASSENGER",
      mileagePoints : 0
    };
    const rawPassenger = new passengerModel(passengerObject);
    try {
      const passenger = await rawPassenger.save();
      const payload = {
        _id: passenger._id,
        passengerName: passengerName,
        email: email,
        type: "PASSENGER",
        mileagePoints : 0
      };
      const jwtToken = jwt.sign(payload, config.jwtSecretKey, {
        expiresIn: config.jwtExpiryTime,
      });

      const response = {
        _id: passenger._id,
        passengerName: capitalizeFirstLetter(passenger.passengerName),
        email: passenger.email,
        type: "PASSENGER",
        token: jwtToken,
        mileagePoints : 0
      };
      res.status(200).send(response);
      return;
    } catch (error) {
      res.status(400).send({
        errorMessage: error,
      });
    }
  }
});
module.exports = router;
