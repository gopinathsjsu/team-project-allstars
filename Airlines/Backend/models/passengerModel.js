const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const passengerSchema = new Schema(
  {
    passengerName: { type: String, trim: true },
    email: { type: String, trim: true },
    password: { type: String, trim: true, required: true },
    mileagePoints: { type: Number, required: false },
  },
  {
    versionKey: false,
  }
);

const passengerModel = mongoose.model("passenger", passengerSchema);
module.exports = passengerModel;
