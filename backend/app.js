const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoute = require("./routes/user-routes");

//Use bodyParser
app.use(bodyParser.urlencoded({ extend: true }));
app.use(bodyParser.json());

//Connect app to MongoDB
mongoose.connect("mongodb://localhost:27017/perfectSoft");

// Security configuration
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Content-Type, X-Requested-with"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, OPTIONS, PATCH, PUT"
  );
  next();
});

app.use("/api/users", userRoute);

module.exports = app;
