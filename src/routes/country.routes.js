const express = require('express');
const {
    update,
    index,
    show
} = require('../controllers/country.controller');
const { ensureAuth }  = require("../middleware/user.auth");

const api = express.Router();

api.get('/', index);
api.get('/:id', show);
api.put('/', ensureAuth, update);

module.exports = api;