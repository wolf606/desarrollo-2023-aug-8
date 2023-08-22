const mongoose = require("mongoose");

const CustomerSchema = mongoose.Schema({
    name: { type: String },
    email: { type: String },
    active: { type: Boolean },
    photos: {
        type: Array
    }
}, {timestamps: true});

module.exports = mongoose.model("Customer", CustomerSchema);