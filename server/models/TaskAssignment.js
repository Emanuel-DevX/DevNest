const mongoose = require("mongoose");

const taskAssignmentSchema = new mongoose.Schema(
  {
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    addedToCalendar: {
      type: Boolean,
      default: false,
    },
    reminderTime: {
      type: Date,
      default: null,
    },
    startTime: {
      type: Date,
      default: null,
    },


  },
  { timestamps: true }
);

taskAssignmentSchema.index({ userId: 1, taskId: 1 }, { unique: true });

const TaskAssignment = mongoose.model("TaskAssignment", taskAssignmentSchema);
module.exports = TaskAssignment;