const mongoose = require("mongoose");

const TaskScheduleSchema = new mongoose.Schema({
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
  scheduledAt: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    default: 1,
  },
  recurring: {
    isRecurring: { type: Boolean, default: false },
    startDate: Date,
    interval: Number, // every X days
    occurrences: [
      {
        date: Date,
        done: Boolean,
      },
    ],
  },
});
module.exports = mongoose.model("TaskSchedule", TaskScheduleSchema);
