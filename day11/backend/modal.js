const mongoose = require("mongoose");
const validator = require("validator");
const registerScheme = new mongoose.Schema({
  email: {
    type: String,
    Unique: true,
    required: true,
  },
  phoneNumber: {
    type: Number,
    Unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    // required : true,
  },
});
// const loginScheme = new mongoose.Schema({
//   email: {
//     type: String,
//     Unique: true,
//     required: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
// });
const cardModal = new mongoose.model("register", registerScheme);
// const loginModal = new mongoose.model("register", loginScheme);
module.exports = { cardModal };
