"use strict";
const app = require("./app");
const port = process.env.PORT || 3001;

const mongoDbConnection = require("./utils/dbConnection")

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

mongoDbConnection();

module.exports = app;
