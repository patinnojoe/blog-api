const mongoose = require("mongoose");
const { connectionURL } = require("../config/keys");

const connectDB = async () => {
  try {
    await mongoose.connect(connectionURL);
    console.log("data base connection successful");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectDB;
