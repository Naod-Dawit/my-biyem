const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  duration: { type: Number, required: true },
  phone: { type: String, required: true },
  expiryDate: { type: Date, required: true },
});
const myDatabase = mongoose.connection.useDb('GYM');



const Customer = myDatabase.model("Member", CustomerSchema);
module.exports = Customer;
