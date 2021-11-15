const mongoose = require("mongoose");
const { mongoDBURI } = require("./config");
const mongoDbConnection = async () => {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  try {
    await mongoose.connect(mongoDBURI, options);
    console.log("MongoDB connected");
  } catch (err) {
    console.log("Could not connect to MongoDB", err);
  }
};

module.exports = mongoDbConnection;
