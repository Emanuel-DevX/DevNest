const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    description: {
      type: String,
      default: "",
    },
    duration: {
      type: Number,
      default: 30,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
    startTime: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const taskModel = mongoose.model("Task", taskSchema);
module.exports = taskModel;
