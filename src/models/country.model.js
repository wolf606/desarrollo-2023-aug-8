const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
    name: String,
    code: String,
}, {timestamps: true});

module.exports = mongoose.model('Country', countrySchema);