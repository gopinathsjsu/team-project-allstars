const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const flightSchema = new Schema(
	{
		flightName: { type: String, trim: true },
		departureFrom: { type: String, trim: true },
		arrivalAt: { type: String, trim: true, required: true },
		arrivalDate: { type: Date, required: false },
		departureDate: { type: Date, trim: true, required: true },
		economySeatsCapacity: { type: Number },
		economySeatsBooked: {
			bookedSeats: { type: String },
			isBooked: [],
		},
		businessSeatsCapacity: { type: Number },
		businessSeatsBooked: {
			bookedSeats: { type: String },
			isBooked: [],
		},
		economySeatPrice: { type: Number },
		businessSeatPrice: { type: Number },
	},
	{
		versionKey: false,
	}
);

const flightModel = mongoose.model("flight", flightSchema);
module.exports = flightModel;
