const axios = require("axios");
const Customer = require("../models/CustomerSchema");

const Getdata = async (req, res) => {
  try {
    const Members = await Customer.find();
    res.json(Members);
  } catch (err) {
    console.error(err);
  }
};

module.exports = Getdata;
