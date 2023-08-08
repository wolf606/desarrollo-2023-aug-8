const express = require("express");
const cors = require("cors");

const { API_VERSION } = require("./config");

const app = express();

app.use(cors());
app.use(express.json());

app.get(`/api/${API_VERSION}/status`, (request, response) => {
    const status = {
       "Status": "Running"
    };
    
    response.send(status);
 });

module.exports = app;