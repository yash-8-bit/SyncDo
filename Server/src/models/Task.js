import mongoose from "mongoose";

// Schema of Task
const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
    },
    assignedUser: {
      type: String,
    },
    status: {
      type: String,
      enum: ["ToDo", "In Progress", "Done"],
      default: "ToDo",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("task_data", TaskSchema);
export default Task;
