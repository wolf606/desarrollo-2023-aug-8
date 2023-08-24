const mongoose = require("mongoose");

const ServiceSchema = mongoose.Schema({
    name: { type: String },
    description: { type: String },
    photos: { type: Array },
    active: { type: Boolean },
    category: {
        type: mongoose.Schema.Types.ObjectId, ref: "Category"
    }
}, {timestamps: true});

module.exports = mongoose.model("Service", ServiceSchema);