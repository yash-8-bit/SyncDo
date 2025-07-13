import Task from "../models/Task.js";
import { getio } from "../socketHandler.js";

async function Get(req, res) {
  try {
    const status = ["ToDo", "In Progress", "Done"];
    const response = await Task.find({});
    const task = { ToDo: [], "In Progress": [], Done: [] };
    status.forEach((s) => {
      task[s] = response.filter((item) => item.status === s);
    });
    res.status(200).json({ data: task });
  } catch (error) {
    console.log(error);
  }
}

async function Add(req, res) {
  try {
    const io = getio();
    const { title, description, status, priority } = req.body;
    const username = req.user;
    const newtask = new Task({
      title: title,
      description: description,
      assignedUser: username,
      status: status,
      priority: priority,
    });
    await newtask.save();
    res.status(201).json({ message: "Add Successfull" });
    io.emit("addtask", newtask);
  } catch (error) {
    console.error(error);
  }
}

async function Delete(req, res) {
  try {
    const io = getio();
    const { _id } = req.params;
    const deletedtask = await Task.findByIdAndDelete(_id);
    res.status(200).json({ message: "Task Deleted Successfull" });
    io.emit("deletetask", deletedtask);
  } catch (error) {
    console.error(error);
  }
}

async function Update(req, res) {
  try {
    const io = getio();
    const { _id } = req.params;
    const username = req.user;
    const allowedFields = ["title", "description", "status", "priority"];
    const updatedata = { assignedUser: username };
    allowedFields.forEach((field) => {
      if (Object.hasOwn(req.body, field)) {
        updatedata[field] = req.body[field];
      }
    });
    const updatedtask = await Task.findByIdAndUpdate(
      _id,
      { $set: updatedata },
      { new: true }
    );
    res.status(201).json({ message: "Task Updated Successfull" });
    io.emit("updatedtask", updatedtask);
  } catch (error) {
    console.error(error);
  }
}

export default { Add, Delete, Update, Get };
