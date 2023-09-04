const express = require("express");
const api = express.Router();
const { ensureAuth } = require("../middleware/user.auth");

const {
    store,
    index,
    show,
    update,
    destroy,
    wipe
} = require("../controllers/category.controller");

api.post(`/`, ensureAuth, store);
api.get('/', index);
api.get('/:id', show);
api.put('/:id', ensureAuth, update);
api.delete('/:id', ensureAuth, destroy);
api.delete('/', ensureAuth, wipe);

module.exports = api;