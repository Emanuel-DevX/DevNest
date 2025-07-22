const mongoose = require("mongoose");

const sprintSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
      trim: true,
    },
    startDate: Date,
    endDate: Date,
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    features: [String],
  },
  { timestamps: true }
);

const sprintModel = mongoose.model("Sprint", sprintSchema);
module.exports = sprintModel;
