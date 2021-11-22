const passengerModel = require("../models/passengerModel");

const checkIfEmailIsAlreadyUsedByPassenger = async (email) => {
  const passenger = await passengerModel.findOne({ email });
  if (passenger == null) {
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
  capitalizeFirstLetter,
};
