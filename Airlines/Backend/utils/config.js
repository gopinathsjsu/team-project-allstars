"use strict";
const config = {
	//frontendURI: "http://localhost:3000",
	frontendURI: "http://52.53.210.19:3000",
	mongoDBURI:
		"mongodb+srv://admin:admin123@cluster0.czfry.mongodb.net/airline202?retryWrites=true&w=majority",
	jwtSecretKey: "secretKey",
	jwtExpiryTime: 120000,
};

module.exports = config;
