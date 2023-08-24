const express = require("express");
const api = express.Router();
const { singleHandler } = require("../utils/multer");

const {
    uploadFiles,
    store,
    index,
    show
} = require("../controllers/customer.controller");

api.post(`/`, 
(req, res, next) => {
    singleHandler(req, res, next, 'uploads/avatar/', 'avatar')
}
, store);
api.get('/', index);
api.get('/:id', show);

module.exports = api;