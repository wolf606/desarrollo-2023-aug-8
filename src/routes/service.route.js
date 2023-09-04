const express = require("express");
const api = express.Router();
const multer = require("multer");
const storageLoc = 'uploads/service/';
const upload = multer({ dest: storageLoc });
const { ensureAuth } = require("../middleware/user.auth");

const {
    show,
    index,
    store,
    update,
    destroy,
    wipe
} = require("../controllers/service.controller");

api.post(`/`, upload.array('gallery'), ensureAuth, store);
api.get('/', index);
api.get('/:id', show);
api.put('/:id', upload.array('gallery'), ensureAuth, update);
api.delete('/:id', ensureAuth, destroy);
api.delete('/', ensureAuth, wipe);

module.exports = api;