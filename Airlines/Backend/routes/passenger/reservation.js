const express = require("express");
const reservationModel = require("../../models/reservationModel");
const flightModel = require("../../models/flightModel");

// Initializing Router
const router = express.Router();

router.post("/", async (req, res) => {
  console.log("inside reservation");
  console.log("req.body", req.body);

  //create reservation
  const origin = req.body.origin;
  const destination = req.body.destination;
  const departureDate = req.body.departureDate;
  const arrivalDate = req.body.arrivalDate;
  const numberOfTravellers = req.body.numberOfTravellers;
  const travelType = req.body.travelType;
  const flightId = req.body.flightId;
  const travellers = req.body.travellers;
  const bookedBy = req.body.bookedBy;
  const reservationStatus = req.body.reservationStatus;

  const newReservation = new reservationModel({
    origin: origin,
    destination: destination,
    departureDate: departureDate,
    arrivalDate: arrivalDate,
    numberOfTravellers: numberOfTravellers,
    travelType: travelType,
    flightId: flightId,
    travellers: travellers,
    bookedBy: bookedBy,
    reservationStatus: reservationStatus,
  });

  console.log(travellers[0].seatNumber);
  var index = travellers[0].seatNumber;
  var update = { $set: {} };
  update["$set"]["economySeatsBooked." + index] = true;
   flightModel.updateOne({ _id: flightId }, update);

    var updatedValue = flightModel.update(
      { _id: flightId },
      {
        $set: {
          "economySeatsBooked.${index}" : true
        },
      }
    );
    console.log("updatedValue", updatedValue);
  try {
    // await newReservation.save();

    res.status(201).json(newReservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
module.exports = router;
