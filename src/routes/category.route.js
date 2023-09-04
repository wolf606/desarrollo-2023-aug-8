const express = require("express");
const api = express.Router();

const {
    store,
    index,
    show
} = require("../controllers/category.controller");

api.post(`/`, store);
api.get('/', index);
api.get('/:id', show);

module.exports = api;