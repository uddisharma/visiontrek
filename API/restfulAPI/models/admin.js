import mongoose from "mongoose";

// Defining Schema
const adminSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true },
});

// Model
const adminModal = mongoose.model("admin", adminSchema);

export default adminModal;
