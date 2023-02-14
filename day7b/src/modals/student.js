const mongoose = require("mongoose");
const validator = require("validator");
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    // validate(value) {
    //   if (value < 18) {
    //     throw new Error("Please enter a valid age.");
    //   }
    // }
  },
  email: {
    type: String,
    required: true,
    //   unique: true,
    //   validate(value) {
    //     if (!validator.isEmail(value)) {
    //       throw new Error("Please enter a valid email");
    //     }
    //   },
  },
  number: {
    type: Number,
    required: true,
    //   unique: true,
    //   validate(value) {
    //     if (!validator.isMobilePhone(value)) {
    //       throw new Error("Please enter a valid number");
    //     }
    //   },
  },
});

const StudentModal = new mongoose.model("Student", studentSchema);
module.exports = StudentModal;
