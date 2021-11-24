const express = require("express");
const config = require("../../utils/config");
const flightModel = require("../../models/flightModel");
const router = express.Router();

router.post("/", async (req, res) => {
	let flightData;
	try {
		if (req.body.type == "economy") {
			flightData = await flightModel.find(
				{
					departureFrom: req.body.departureFrom,
					arrivalAt: req.body.arrivalAt,
					departureDate: req.body.departureDate,
					economySeatsCapacity: { $gt: req.body.travellers },
				},
				{}
			);
		} else {
			flightData = await flightModel.find(
				{
					departureFrom: req.body.departureFrom,
					arrivalAt: req.body.arrivalAt,
					departureDate: req.body.departureDate,
					businessSeatsCapacity: { $gt: req.body.travellers },
				},
				{}
			);
		}
		if (flightData && flightData.length > 0) {
			res.writeHead(200, {
				"Content-Type": "text/plain",
			});
			res.end(JSON.stringify(flightData));
		} else {
			res.writeHead(404, {
				"Content-Type": "text/plain",
			});
			res.end("NO_DATA");
		}
	} catch (error) {
		res.writeHead(500, {
			"Content-Type": "text/plain",
		});
		res.end("INVALID_DATA");
	}
});
module.exports = router;
