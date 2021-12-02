const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const flightSchema = new Schema(
	{
		flightName: { type: String, trim: true },
		departureFrom: { type: String, trim: true },
		arrivalAt: { type: String, trim: true, required: true },
		flightStatus: { type: String, trim: true, required: true },
		arrivalDate: { type: Date, required: false },
		departureDate: { type: Date, trim: true, required: true },
		economySeatsCapacity: { type: Number },
		departureTime: { type: String, required: true },
		arrivalTime: { type: String, required: true },
		// economySeatsBooked: {
		//   bookedSeats: { type: String },
		//   isBooked: [],
		// },
		economySeatsBooked: [{ type: Boolean }],
		businessSeatsCapacity: { type: Number },
		businessSeatsBooked: [{ type: Boolean }],
		// businessSeatsBooked: {
		//   bookedSeats: { type: String },
		//   isBooked: [ {type : Boolean}],
		// },
		economySeatPrice: { type: Number },
		businessSeatPrice: { type: Number },
	},
	{
		versionKey: false,
	}
);

const flightModel = mongoose.model("flight", flightSchema);
module.exports = flightModel;
