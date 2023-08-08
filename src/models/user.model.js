const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name: { type: String },
    lastname: { type: String },
    email: { type: String },
    password: { type: String },
    address: {
        type: Schema.Types.ObjectId, ref: "Address"
    }
});

module.exports = mongoose.model("User", UserSchema);