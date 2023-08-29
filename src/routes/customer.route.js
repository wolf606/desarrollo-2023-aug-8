const express = require("express");
const api = express.Router();
const multer = require("multer");
const storageLoc = 'uploads/avatar/';
const upload = multer({ dest: storageLoc });

const {
    store,
    index,
    show
} = require("../controllers/customer.controller");

api.post(`/`, upload.single('avatar'), store);
api.get('/', index);
api.get('/:id', show);

module.exports = api;