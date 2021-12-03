const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reservationSchema = new Schema(
  {
    origin: { type: String, trim: true },
    destination: { type: String, trim: true },
    departureDate: { type: Date, trim: true, required: true },
    arrivalDate: { type: Date, required: false },
    departureTime : {type : String},
    arrivalTime: {type: String},
    numberOfTravellers: { type: Number },
    travelType: { type: String }, // Economy/Business
    flightId: { type: mongoose.Schema.Types.ObjectId, ref: "flight" },
    travellers: [
      {
        firstName: { type: String, trim: true, required: true },
        lastName: { type: String, trim: true, required: true },
        phoneNumber: { type: String, trim: true, required: true },
        dob: { type: String, trim: true, required: true },
        seatNumber: { type: String, trim: true, required: true },
        gender: {type: String , required: true}
      },
    ],
    bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: "passenger" },
    reservationStatus: { type: String, trim: true },
    price: { type: Number },
    mileagePointsEarned: { type: Number },
    mileagePointsUsed: { type: Number },
  },
  {
    versionKey: false,
  }
);

const reservationModel = mongoose.model("reservation", reservationSchema);
module.exports = reservationModel;
