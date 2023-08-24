const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
    name: { type: String },
    active: { type: Boolean }
}, {timestamps: true});

module.exports = mongoose.model("Category", CategorySchema);