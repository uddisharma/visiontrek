import mongoose from "mongoose";

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
    type: Boolean,
  },
});

const CardModel = new mongoose.model("Card", makeCard);
export default CardModel;
