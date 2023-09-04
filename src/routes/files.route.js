const express = require("express");
const api = express.Router();

const {
    show
} = require("../controllers/files.controller");

api.get('/:folder/:filename', show);

module.exports = api;