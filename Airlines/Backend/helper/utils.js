const passengerModel = require("../models/passengerModel");
const employeeModel = require("../models/employeeModel");

const checkIfEmailIsAlreadyUsedByPassenger = async (email) => {
  const passenger = await passengerModel.findOne({ email });
  if (passenger == null) {
    return false;
  } else {
    return true;
  }
};

const checkIfEmailIsAlreadyUsedByEmployee = async (email) => {
  const employee = await employeeModel.findOne({ email });
  if (employee == null) {
    return false;
  } else {
    return true;
  }
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

module.exports = {
  checkIfEmailIsAlreadyUsedByPassenger,
  checkIfEmailIsAlreadyUsedByEmployee,
  capitalizeFirstLetter,
};
