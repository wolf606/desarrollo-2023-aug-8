const express = require("express");
const api = express.Router();
const {
    store,
    index,
    show,
    update,
    destroy,
    wipe
} = require("../controllers/user.controller");
const {
    validateUserStore,
    validateUserShow,
    validateUserDestroy,
    validateUserUpdate
} = require("../validators/user.validator");
const { ensureAuth } = require("../middleware/user.auth");

api.post("/users", validateUserStore,store);
api.get("/users", index);
api.get("/users/:id", validateUserShow, show);
api.put("/users/:id", ensureAuth, validateUserUpdate, update);
api.delete("/users/:id", ensureAuth, validateUserDestroy, destroy);
api.delete("/users", ensureAuth, wipe);

module.exports = api;