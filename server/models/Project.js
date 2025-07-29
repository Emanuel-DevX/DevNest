const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 20,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      maxlength: 300,
      default: "",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    protected: {
      type: Boolean,
      default: false,
    },

  },
  { timestamps: true }
);

const projectModel = mongoose.model("Project", projectSchema);
module.exports = projectModel;
