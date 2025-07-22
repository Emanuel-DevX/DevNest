const mongoose = require("mongoose");
const membershipSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    role: {
      type: String,
      enum: ["owner", "editor", "viewer"],
      default: "editor",
    },
    joinedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const membershipModel = mongoose.model("Membership", membershipSchema);
module.exports = membershipModel;
