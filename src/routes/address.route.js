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

api.post("/", store);
api.get("/", index);
api.get("/:id", show);
api.put("/:id", update);
api.delete("/:id", destroy);
api.delete("/", wipe);

module.exports = api;