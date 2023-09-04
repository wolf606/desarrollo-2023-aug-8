const express = require("express");
const api = express.Router();
const multer = require("multer");
const storageLoc = 'uploads/avatar/';
const upload = multer({ dest: storageLoc });

const {
    store,
    index,
    show,
    update,
    destroy,
    wipe
} = require("../controllers/customer.controller");

api.post(`/`, upload.single('avatar'), store);
api.get('/', index);
api.get('/:id', show);
api.put('/:id', upload.single('avatar'), update);
api.delete('/:id', destroy);
api.delete('/', wipe);

module.exports = api;