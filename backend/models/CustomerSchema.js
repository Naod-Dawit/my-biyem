// models/CustomerSchema.js
const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  duration: { type: Number, required: true },
  phone: { type: String, required: true },
  expiryDate: { type: Date, required: true },
});

const Customer = mongoose.connection.useDb("GYM").model("Member", CustomerSchema);

module.exports = Customer;
