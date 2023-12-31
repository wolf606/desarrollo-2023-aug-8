const express = require("express");
const cors = require("cors");

//Get API version
const { API_VERSION } = require("./config");

//Files
const fileRoutes = require("./src/routes/files.route");

//Import Address routes
const addressRoutes = require("./src/routes/address.route");
const userRoutes = require("./src/routes/user.route");
const authRoutes = require("./src/routes/auth.routes");
const customerRoutes = require("./src/routes/customer.route");
const serviceRoutes = require("./src/routes/service.route");
const categoryRoutes = require("./src/routes/category.route");
const stateRoutes = require("./src/routes/state.routes");
const cityRoutes = require("./src/routes/city.routes");
const countryRoutes = require("./src/routes/country.routes");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

//Send routes to router
app.use(`/api/${API_VERSION}/addresses`, addressRoutes);
app.use(`/api/${API_VERSION}/users`, userRoutes);
app.use(`/api/${API_VERSION}`, authRoutes);
app.use(`/api/${API_VERSION}/services`, serviceRoutes);
app.use(`/api/${API_VERSION}/customers`, customerRoutes);
app.use(`/api/${API_VERSION}/categories`, categoryRoutes);
app.use(`/api/${API_VERSION}/states`, stateRoutes);
app.use(`/api/${API_VERSION}/cities`, cityRoutes);
app.use(`/api/${API_VERSION}/countries`, countryRoutes);

//Files routes
app.use(`/uploads`, fileRoutes);

app.use(function(req, res) {
// Invalid request
    res.status(404).send(
        {
            error: "Unimplemented route",
        }
    );
});

module.exports = app;