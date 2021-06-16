const mongoose = require("mongoose");

/*********************FOR TASKS *********************/

const taskSchema = new mongoose.Schema(
  {
    description: {
      type: String,

      required: true,
    },
    completed: {
      default: false,
      type: Boolean,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

/*  */
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
