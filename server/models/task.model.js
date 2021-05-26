const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    collection_id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    deadline: { type: Date, required: true },
    completed: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
