const mongoose = require("mongoose");

const CustomerSchema = mongoose.Schema({
    name: { type: String },
    email: { type: String },
    active: { type: Boolean },
    avatar: {
        type: Object
    }
}, {timestamps: true});

module.exports = mongoose.model("Customer", CustomerSchema);