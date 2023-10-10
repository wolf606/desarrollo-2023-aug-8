const mongoose = require("mongoose");

const Roles = {
    admin: "admin",
    student: "student"
};

const UserSchema = mongoose.Schema({
    name: { type: String },
    lastname: { type: String },
    email: { type: String },
    password: { type: String },
    active: { type: Boolean },
    address: {
        type: mongoose.Schema.Types.ObjectId, ref: "Address"
    },
    role: { 
        type: String, 
        enum: Object.values(Roles) 
    }
}, {timestamps: true});

module.exports = mongoose.model("User", UserSchema);