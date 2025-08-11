// models/Notification.js
const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    // Who receives it
    recipientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
      required: true,
    },

    // Who triggered it
    actorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    // Context (optional but super useful for filtering)
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      index: true,
    },

    // What happened
    type: {
      type: String,
      required: true,
      enum: [
        "TASK_ASSIGNED",
        "TASK_UPDATED",
        "NOTE_CREATED",
        "PROJECT_MEMBER_ADDED",
        "PROJECT_INVITE",
        "PROJECT_MEMBER_REMOVED",
        "PROJECT_DELETED",
        "WELCOME"
      ],
      index: true,
    },

    // Content
    title: { type: String, required: true },
    body: { type: String }, //
    link: { type: String }, // deep link to frontend route

    // Read state
    readAt: { type: Date, default: null, index: true },
  },
  { timestamps: true }
);

// Common queries
NotificationSchema.index({ recipientId: 1, createdAt: -1 });
NotificationSchema.index({ recipientId: 1, readAt: 1, createdAt: -1 });

module.exports = mongoose.model("Notification", NotificationSchema);
