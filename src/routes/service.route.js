const express = require("express");
const api = express.Router();
const multer = require("multer");
const storageLoc = 'uploads/service/';
const upload = multer({ dest: storageLoc });

const {
    uploadFiles,
    show,
    index,
    store
} = require("../controllers/service.controller");

api.post(`/`, upload.array('gallery'), store);
api.get('/', index);
api.get('/:id', show);

module.exports = api;