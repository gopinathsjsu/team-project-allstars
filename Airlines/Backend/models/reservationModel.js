const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reservationSchema = new Schema(
  {
    origin: { type: String, trim: true },
    destination: { type: String, trim: true },
    departureDate: { type: Date, trim: true, required: true },
    arrivalDate: { type: Date, required: false },
    numberOfTravellers: { type: Number },
    travelType: { type: String }, // Economy/Business
    flightId: { type: mongoose.Schema.Types.ObjectId, ref: "flight" },
    travellers: [
      {
        travellersName: { type: String, trim: true },
        phoneNumber: { type: String, trim: true },
        travellersEmail: { type: String, trim: true },
        dob: { type: String, trim: true },
        seatNumber: { type: String, trim: true },
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
