const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    googleId: { type: String, required: true, unique: true },
    name: String,
    email: String,
    image: String,
    school: String,
    work: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
