const express = require("express");
const cors = require("cors");

//Get API version
const { API_VERSION } = require("./config");

//Import Address routes
const addressRoutes = require("./src/routes/address.route");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

//Send routes to router
app.use(`/api/${API_VERSION}`, addressRoutes);

module.exports = app;