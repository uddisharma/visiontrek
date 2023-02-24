const mongoose = require("mongoose");
const validator = require("validator");
const registerScheme = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    Unique: true,
    required: true,
  },
  // phoneNumber: {
  //   type: Number,
  //   Unique: true,
  //   // required: true,
  // },
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
  location: {
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
  shared: {
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
const locationSchema = new mongoose.Schema({
  Country: {
    type: String,
  },
  State: {
    type: String,
  },
  City: {
    type: String,
  },
});
const cardModal = new mongoose.model("register", registerScheme);
const makeCardModal = new mongoose.model("card", makeCard);
const adminModal = new mongoose.model("admin", adminScheme);
const locationModal = new mongoose.model("location", locationSchema);
module.exports = { cardModal, makeCardModal, adminModal, locationModal };
