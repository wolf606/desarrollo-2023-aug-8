const express = require("express");
const api = express.Router();
const {
    store,
    index,
    show,
    update,
    destroy,
    wipe
} = require("../controllers/address.controller");

api.post("/addresses", store);
api.get("/addresses", index);
api.get("/addresses/:id", show);
api.put("/addresses/:id", update);
api.delete("/addresses/:id", destroy);
api.delete("/addresses", wipe);

module.exports = api;