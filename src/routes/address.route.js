const express = require("express");
const api = express.Router();
const {
    store,
    index,
    show
} = require("../controllers/address.controller");

api.post("/addresses", store);
api.get("/addresses", index);
api.get("/addresses/:id", show);

module.exports = api;