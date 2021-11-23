const express = require("express");
const Joi = require("joi");
const employeeModel = require("../../models/employeeModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  checkIfEmailIsAlreadyUsedByEmployee,
  capitalizeFirstLetter,
} = require("../../helper/utils");
const config = require("../../utils/config");

// Initializing Router
const router = express.Router();

// User SignUp API
router.post("/", async (req, res) => {
  const schema = Joi.object({
    employeeName: Joi.string()
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

  // Check whether this email is used by employee or not
  const isEmailUsed = await checkIfEmailIsAlreadyUsedByEmployee(
    req.body.email
  );
  if (isEmailUsed) {
    res.status(400).send({
      errorMessage: "Account belonging to this email already exists.",
    });
    return;
  } else {
    // Create employee
    const employeeName = req.body.employeeName;
    const email = req.body.email;
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt());
    const employeeObject = {
      employeeName: employeeName,
      email: email,
      password: hashedPassword,
      type: "EMPLOYEE",
    };
    console.log("employeeObject");
    const rawEmployee = new employeeModel(employeeObject);
    try {
      const employee = await rawEmployee.save();
      const payload = {
        _id: employee._id,
        employeeName: employeeName,
        email: email,
        type: "EMPLOYEE",
      };
      const jwtToken = jwt.sign(payload, config.jwtSecretKey, {
        expiresIn: config.jwtExpiryTime,
      });

      const response = {
        _id: employee._id,
        employeeName: capitalizeFirstLetter(employee.employeeName),
        email: employee.email,
        type: "EMPLOYEE",
        token: jwtToken,
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
