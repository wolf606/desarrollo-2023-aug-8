const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name: { type: String },
    lastname: { type: String },
    email: { type: String },
    password: { type: String },
    active: { type: Boolean },
    address: {
        type: mongoose.Schema.Types.ObjectId, ref: "Address"
    }
});

module.exports = mongoose.model("User", UserSchema);