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
    // required: true,
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
const makeCard = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
  },
  profession: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },

  linkedIn: {
    type: String,
  },
  instagram: {
    type: String,
  },
  facebook: {
    type: String,
  },
});
const adminScheme = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    Unique: true,
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
  },
});
const cardModal = new mongoose.model("register", registerScheme);
const makeCardModal = new mongoose.model("card", makeCard);
const adminModal = new mongoose.model("admin", adminScheme);
module.exports = { cardModal, makeCardModal, adminModal };
