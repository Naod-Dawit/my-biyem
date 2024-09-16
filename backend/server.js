require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const Customer = require("./models/CustomerSchema");

app.use(express.json());
app.use(cors());
const ConnectDb=require("./utils/db");
const Getdata = require("./controllers/getMembers");
ConnectDb()

app.post("/api/login", async (req, res) => {
  const { name, password } = req.body;
  if (name === "" && password === "") {
    console.log("Entry allowed");
    return res.json({ success: true, message: "Login successful" });
  } else {
    return res.json({ success: false, message: "Invalid credentials" });
  }
});

app.post("/api/add-member", async (req, res) => {
  try {
    const { name, date, duration, phone, expiryDate } = req.body;
    const newCustomer = new Customer({
      name,
      date,
      duration,
      phone,
      expiryDate,
    });
    
    await newCustomer.save();
    return res.json({ success: true, message: "Member added successfully" });
  } catch (err) {
    console.error(err);
    return res.json({
      success: false,
      message: "Failed to create Member data",
    });
  }
});
app.get('/api/getdata',Getdata);


const PORT = 8000;
app.listen(PORT, () => {
  console.log(`PORT IS RUNNING ON  ${PORT}`);
});
