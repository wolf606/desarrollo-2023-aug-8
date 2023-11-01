const express = require("express");
const api = express.Router();
const {
    store,
    index,
    show,
    update,
    destroy,
    wipe,
    getMe
} = require("../controllers/user.controller");
const {
    validateUserStore,
    validateUserShow,
    validateUserDestroy,
    validateUserUpdate
} = require("../validators/user.validator");
const { ensureAuth } = require("../middleware/user.auth");

const multer = require("multer");
const storageLoc = 'uploads/avatar/';
const upload = multer({ dest: storageLoc });

api.post("/", upload.single('avatar'), validateUserStore, store);
api.get("/", index);
api.get("/me", ensureAuth, getMe);
api.get("/:id", validateUserShow, show);
api.put("/:id", upload.single('avatar'), ensureAuth, validateUserUpdate, update);
api.delete("/:id", ensureAuth, validateUserDestroy, destroy);
api.delete("/", ensureAuth, wipe);

module.exports = api;