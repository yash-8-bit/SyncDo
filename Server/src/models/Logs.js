import mongoose from "mongoose";

const LogsSchema = new mongoose.Schema({
  action: {
    type: String,
    enum: ["add", "update", "delete", "assign", "drag-drop"],
    required: true,
  },
  time: { type: Date, default: Date.now },
  details: { type: String, required: true },
});

const Logs = mongoose.model("logs_data", LogsSchema);

export default Logs;
