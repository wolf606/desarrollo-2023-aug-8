const express = require('express');

const {
    index,
    show
} = require('../controllers/city.controller');

const api = express.Router();

api.get('/', index);
api.get('/:id', show);

module.exports = api;