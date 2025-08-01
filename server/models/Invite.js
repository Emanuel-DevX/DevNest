const mongoose = require("mongoose");

const inviteSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Project",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  expiresAt: { type: Date, required: true },
});

const inviteModel = mongoose.model("Invite", inviteSchema);
module.exports = inviteModel;
