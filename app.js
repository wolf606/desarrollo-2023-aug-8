const express = require("express");
const cors = require("cors");

//Get API version
const { API_VERSION } = require("./config");

//Import Address routes
const addressRoutes = require("./src/routes/address.route");
const userRoutes = require("./src/routes/user.route");
const authRoutes = require("./src/routes/auth.routes");
const customerRoutes = require("./src/routes/customer.route");
const serviceRoutes = require("./src/routes/service.route");
const fileRoutes = require("./src/routes/files.route");

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
app.use(``, fileRoutes);

app.use(function(req, res) {
// Invalid request
    res.status(404).send(
        {
            error: "Unimplemented route",
        }
    );
});

module.exports = app;