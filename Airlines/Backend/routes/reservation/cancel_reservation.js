const express = require("express");
const reservationModel = require("../../models/reservationModel");
const flightModel = require("../../models/flightModel");
const passengerModel = require("../../models/passengerModel");

// Initializing Router
const router = express.Router();

//-------------Cancel Reservations -------------------

router.post("/:resId", async (req, res) => {
  //const flightId = req.params.flightId;
  //const passengerId = req.params.bookedBy;
  const reservationId = req.params.resId;
  //const bookedBy = req.body.bookedBy;

  try {
    let reservation = await reservationModel.findById({ _id: reservationId });
    let psgDet = await passengerModel.findById({ _id: reservation.bookedBy });
    console.log("Reservation Details", reservation);
    const mileagePointsEarned = reservation.mileagePointsEarned;
    const mileagePointsUsed = reservation.mileagePointsUsed;
    const travellers = reservation.travellers;
    //if (req.body.paidWithPoints == 1) {
    psgDet.mileagePoints =
      psgDet.mileagePoints - mileagePointsEarned + mileagePointsUsed;
    if (psgDet.mileagePoints < 0) {
      psgDet.mileagePoints = 0;
    }
    psgDet.save();
    console.log("Passenger Details", psgDet);
    await reservationModel.findOneAndUpdate(
      {
        _id: reservationId,
        // flightId: flightId,
        //bookedBy: passengerId
      },
      {
        reservationStatus: "Cancelled",
        mileagePointsEarned: "0",

        //Mileage rewards yet to be implemented
      }
    );
    var index = parseInt(reservation.travellers[0].seatNumber) - 1;
    let existingFlight = await flightModel.findById({
      _id: reservation.flightId,
    });

    console.log("Index value", index);
    if (existingFlight) {
      if (reservation.travelType.toLowerCase() == "economy") {
        travellers.forEach((t) => {
          existingFlight.economySeatsBooked[t.seatNumber - 1] = false;
        });
        //existingFlight.economySeatsBooked[index] = false;
      } else if (reservation.travelType.toLowerCase() == "business") {
        travellers.forEach((t) => {
          existingFlight.businessSeatsBooked[t.seatNumber - 1] = false;
        });
        //existingFlight.businessSeatsBooked[index] = false;
      }
      existingFlight.save();
      console.log("Existing Flight", existingFlight);
    } else {
      res.status(401).json({ message: "Flight not found in db" });
    }

    reservation.save();
    res.status(203).json(psgDet.mileagePoints);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

module.exports = router;
