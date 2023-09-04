const express = require("express");
const api = express.Router();
const multer = require("multer");
const storageLoc = 'uploads/service/';
const upload = multer({ dest: storageLoc });

const {
    show,
    index,
    store,
    update
} = require("../controllers/service.controller");

api.post(`/`, upload.array('gallery'), store);
api.get('/', index);
api.get('/:id', show);
api.put('/:id', upload.array('gallery'), update);

module.exports = api;