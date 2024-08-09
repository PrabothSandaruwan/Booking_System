const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

require("dotenv").config();

const PORT = process.env.PORT || 8070;
const URL_1 = process.env.MONGO_URL_1;

app.use(cors());

//server configuration

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

mongoose.connect(URL_1, {});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Mongodb connection_1 successful");
});

// Import routes

const hotelRoutes = require("./routes/hotelRoutes");

// Use routes

app.use("/api/hotels", hotelRoutes);