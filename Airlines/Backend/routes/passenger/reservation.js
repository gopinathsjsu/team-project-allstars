const express = require("express");
const reservationModel = require("../../models/reservationModel");
const flightModel = require("../../models/flightModel");
const passengerModel = require("../../models/passengerModel");

// Initializing Router
const router = express.Router();

router.post("/", async (req, res) => {
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
	const response = {};

	var index = parseInt(travellers[0].seatNumber) - 1;
	// let totalPointsEarned;
	// let totalPointsUsed;
	// let totalPrice;
	try {
		let passengerDetails = await passengerModel.findById({ _id: bookedBy });
		// if (req.body.paidWithPoints == 1) {
		// 	//passenger uses the MP's to make a reservation

		// 	const availablePoints = passengerDetails.mileagePoints; //current MP
		// 	totalPrice = price - availablePoints; // deduct MP from actual price
		// 	totalPointsEarned = req.body.price * (25 / 100); //earning new points for this reservation
		// 	totalPointsUsed = availablePoints; // the points used for this reservation
		// 	passengerDetails.mileagePoints = totalPointsEarned;
		// 	passengerDetails.save();
		// } else if (req.body.paidWithPoints == 0) {
		// 	// Not using Mileage points
		// 	totalPointsEarned = req.body.price * (25 / 100); //calculating the points based on price
		// 	totalPointsUsed = 0; // since MP is not used here
		// 	passengerDetails.mileagePoints =
		// 		passengerDetails.mileagePoints + totalPointsEarned; //updating total MP
		// 	totalPrice = price; //total proce for this reservation
		// 	passengerDetails.save();
		// }
		const availablePoints = passengerDetails.mileagePoints;
		passengerDetails.mileagePoints =
			availablePoints +
			req.body.mileagePointsEarned -
			req.body.mileagePointsUsed;
		passengerDetails.save();

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
			//price: totalPrice,
			// mileagePointsEarned: totalPointsEarned,
			// mileagePointsUsed: totalPointsUsed,
			price: req.body.price,
			mileagePointsEarned: req.body.mileagePointsEarned,
			mileagePointsUsed: req.body.mileagePointsUsed,
			flight: req.body.flight,
			arrivalTime: req.body.arrivalTime,
			departureTime: req.body.departureTime,
		});

		const resStatus = await newReservation.save();
		if (resStatus) {
			if (flightId != null) {
				let existingFlight = await flightModel.findById({
					_id: flightId,
				});
				if (existingFlight && travellers.length > 0) {
					if (req.body.travelType.toLowerCase() == "economy") {
						travellers.forEach((t) => {
							existingFlight.economySeatsBooked[t.seatNumber - 1] = true;
						});
						//existingFlight.economySeatsBooked[index] = true;
					} else if (req.body.travelType.toLowerCase() == "business") {
						travellers.forEach((t) => {
							existingFlight.businessSeatsBooked[t.seatNumber - 1] = true;
						});
						//existingFlight.businessSeatsBooked[index] = true;
					}
					existingFlight.save();
				} else {
					response.status = 401;
					response.data = "Flight not found to update the seat";
				}
			}
			response.status = 200;
			response.data = "Reservation created successfully";
		} else {
			response.status = 400;
			response.message = "Failed to save reservation to db";
		}

		res.status(200).json(response);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});
module.exports = router;
