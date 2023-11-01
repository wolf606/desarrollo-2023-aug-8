const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
    name: String,
    code: String,
    stateCode: String,
}, { timestamps: true });

module.exports = mongoose.model('City', citySchema);