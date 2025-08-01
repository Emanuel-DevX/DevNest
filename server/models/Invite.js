const mongoose = require("mongoose");

const inviteSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  projectId: { type: mongoose.Schema.Types.ObjectId, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, required: true },
  expiresAt: { type: Date, required: true },
});

const inviteModel = mongoose.model("Invite", inviteSchema);
module.exports = inviteModel;
