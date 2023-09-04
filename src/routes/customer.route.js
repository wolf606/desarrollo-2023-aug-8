const express = require("express");
const api = express.Router();
const multer = require("multer");
const storageLoc = 'uploads/avatar/';
const upload = multer({ dest: storageLoc });
const { ensureAuth } = require("../middleware/user.auth");

const {
    store,
    index,
    show,
    update,
    destroy,
    wipe
} = require("../controllers/customer.controller");

api.post(`/`, upload.single('avatar'), ensureAuth, store);
api.get('/', index);
api.get('/:id', show);
api.put('/:id', upload.single('avatar'), ensureAuth, update);
api.delete('/:id', ensureAuth, destroy);
api.delete('/', ensureAuth, wipe);

module.exports = api;