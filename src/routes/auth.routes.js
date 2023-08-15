const express = require("express");
const {
    signIn,
} = require("../controllers/auth.controller");
const { 
    validateUserSignIn,
} = require("../validators/auth.validator");

const api = express.Router();

api.post("/login", validateUserSignIn, signIn);

module.exports = api;