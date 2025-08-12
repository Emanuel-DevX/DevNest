const mongoose = require("mongoose");

const TokenSchema = new mongoose.Schema(
  {
    usage: { type: Number, default: 0 },
    cap: { type: Number, default: 50000 },
    period: { type: String }, // "YYYY-MM"
  },
  { _id: false }
);
const userSchema = new mongoose.Schema(
  {
    googleId: { type: String, required: true, unique: true },
    name: String,
    email: String,
    image: String,
    school: String,
    work: String,
    token: {
      type: TokenSchema,
      default: {},
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
