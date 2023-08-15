const express = require("express");
const cors = require("cors");

//Get API version
const { API_VERSION } = require("./config");

//Import Address routes
const addressRoutes = require("./src/routes/address.route");
const userRoutes = require("./src/routes/user.route");
const authRoutes = require("./src/routes/auth.routes");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

//Send routes to router
app.use(`/api/${API_VERSION}`, addressRoutes);
app.use(`/api/${API_VERSION}`, userRoutes);
app.use(`/api/${API_VERSION}`, authRoutes);

module.exports = app;