const express = require("express");
const config = require("../../utils/config");
const bcrypt = require("bcrypt");
const employeeModel = require("../../models/employeeModel");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { capitalizeFirstLetter } = require("../../helper/utils");

// Initializing Router
const router = express.Router();

router.post("/", async (req, res) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required()
      .messages({
        "string.email": "Must be a valid email.",
        "string.empty": "Email cannot be empty.",
        "any.required": "Email is required.",
      }),
    password: Joi.string().required().messages({
      "string.empty": "Password is required.",
      "any.required": "Password cannot be empty",
    }),
  });

  // Validate the input fields
  const result = await schema.validate(req.body);
  if (result.error) {
    res.status(400).send({ errorMessage: result.error.details[0].message });
    return;
  }

  employeeModel
    .findOne({
      email: req.body.email.toLowerCase(),
    })
    .then(async (employee) => {
      if (
        employee === null ||
        !(await bcrypt.compare(req.body.password, employee.password))
      ) {
        res.status(201).send({
          errorMessage: "Invalid email or password",
        });
      } else {
        let unsignedJwtUserObject = {
          _id: employee._id,
          employeeName: capitalizeFirstLetter(employee.employeeName),
          email: employee.email,
          type: "EMPLOYEE",
        };

        // Generate a JWT token
        const jwtToken = jwt.sign(unsignedJwtUserObject, config.jwtSecretKey, {
          expiresIn: config.jwtExpiryTime,
        });

        res.status(200).send({
          ...unsignedJwtUserObject,
          token: jwtToken,
          message: "Logged in successfully.",
        });
      }
    })
    .catch((err) => {
      res.status(400).send({
        errorMessage: err,
      });
    });
});

module.exports = router;
