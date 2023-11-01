const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({
    name: String,
    code: String,
}, {timestamps: true});

module.exports = mongoose.model('State', stateSchema);