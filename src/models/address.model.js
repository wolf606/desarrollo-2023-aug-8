const mongoose = require("mongoose");

const AddressSchema = mongoose.Schema({
    country: { type: String },
    state: { type: String },
    city: { type: String },
    address: { type: String }
});

module.exports = mongoose.model("Address", AddressSchema);