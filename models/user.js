const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email:{
        type: String,
        required: true,
    },
    name: {
        type: String
    },
    profilePic: {
        url: String,
        filename: String,
    },
    address: {
        type: String,
    },
    phoneNo: {
        type: Number,
        required: true,
    },
    isHost: {
        type: Boolean,
    }
});

userSchema.plugin(passportLocalMongoose); //Automatically implements username, salting, hashings and hashed password

module.exports = mongoose.model("User", userSchema);