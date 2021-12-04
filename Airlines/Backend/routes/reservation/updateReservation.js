const express = require("express");

// Initializing Router
const router = express.Router();

const mongoose = require("mongoose");
const reservationModel = require("../../models/reservationModel");
const flightModel = require("../../models/flightModel");

router.post("/:flightId", async (req, res) => {
  console.log("inside get of update reservation");
  let ecoSeatList = [];
  let busiSeatList = [];
  const flightId = req.params.flightId;
  console.log("req.body", req.body);
  const travelType = req.body.travelType;
  console.log("travelType", travelType);
  let flightDetails = await flightModel.findById({ _id: flightId });
  // console.log("flightDetails", flightDetails);
  if (flightDetails) {
    if (travelType.toLowerCase() == "economy") {
      ecoSeatList = flightDetails.economySeatsBooked;
      console.log("in economy");
      console.log(ecoSeatList);
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end(JSON.stringify(ecoSeatList));
    } else if (travelType.toLowerCase() == "business") {
      console.log("in business");
      console.log(busiSeatList);
      busiSeatList = flightDetails.businessSeatsBooked;
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end(JSON.stringify(busiSeatList));
    }
  } else {
    res.writeHead(404, {
      "Content-Type": "text/plain",
    });
    res.end("NO_DATA");
  }
});

router.post("/res/:_id", async (req, res) => {
  const reservationId = req.params._id;
  let oldSeats = [];
  let resDetails = await reservationModel.findById({ _id: reservationId });

  if (resDetails) {
    let existingFlight = await flightModel.findById({
      _id: resDetails.flightId,
    });
    if (existingFlight && resDetails.travellers.length > 0) {
      for (let i = 0; i < resDetails.travellers.length; i++) {
        oldSeats[i] = resDetails.travellers[i].seatNumber;
      }
      resDetails.travellers = req.body.travellers;
      console.log("resDetails", resDetails.travellers);

      if (resDetails.travelType.toLowerCase() == "economy") {
        resDetails.travellers.forEach((t) => {
          existingFlight.economySeatsBooked[t.seatNumber - 1] = true;
        });
        for (let i = 0; i < oldSeats.length; i++) {
          existingFlight.economySeatsBooked[oldSeats[i] - 1] = false;
        }
      } else if (resDetails.travelType.toLowerCase() == "business") {
        resDetails.travellers.forEach((t) => {
          existingFlight.businessSeatsBooked[t.seatNumber - 1] = true;
        });
        for (let i = 0; i < oldSeats.length; i++) {
          existingFlight.businessSeatsBooked[oldSeats[i] - 1] = false;
        }
      }
      resDetails.save();
      existingFlight.save();
    }
    res.writeHead(200, {
      "Content-Type": "text/plain",
    });
    res.end(JSON.stringify({ message: "Update reservation successful!" }));
  } else {
    res.writeHead(404, {
      "Content-Type": "text/plain", 
    });
    res.end("NO_DATA");
  }
});

module.exports = router;
