const express = require("express");
const api = express.Router();
const { arrayHandler } = require("../utils/multer");

const {
    uploadFiles,
    show,
    index,
    store
} = require("../controllers/service.controller");

api.post(`/`, 
(req, res, next) => {
    singleHandler(req, res, next, 'uploads/service/', 'gallery')
}
, store);
api.get('/', index);
api.get('/:id', show);

module.exports = api;