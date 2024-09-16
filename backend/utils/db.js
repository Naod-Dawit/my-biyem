require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGOURL);
    console.log("Database connected");

    const myDatabase = mongoose.connection.useDb("GYM");

    return myDatabase;
  } catch (err) {
    console.error(`Error connecting to Database: ${err}`);
  }
};

module.exports = connectDB;
