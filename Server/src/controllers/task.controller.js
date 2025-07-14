import Logs from "../models/Logs.js";
import Task from "../models/Task.js";
import { getio } from "../socketHandler.js";
import taskfuntion from "../utils/taskfuntion.js";
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
    const time = new Date().toISOString();
    const { title, description, status, priority } = req.body;
    const isTask = await Task.findOne({ title, status });
    if (isTask) {
      return res
        .status(400)
        .json({ message: "Task must be unique according to status" });
    }
    const username = req.user;
    const newtask = new Task({
      title: title,
      description: description,
      assignedUser: username,
      status: status,
      priority: priority,
      createdAt: time,
      updatedAt: time,
    });
    const newlog = new Logs({
      action: "add",
      time: time,
      details: `${username} has added a task with the title '${title}'.`,
    });
    await newtask.save();
    await newlog.save();
    res.status(201).json({ message: "Add Successfull" });
    io.emit("addedtask", { newtask, newlog });
  } catch (error) {
    console.error(error);
  }
}

async function Delete(req, res) {
  try {
    const io = getio();
    const time = new Date().toISOString();
    const { _id } = req.params;
    const deletedtask = await Task.findByIdAndDelete(_id);
    const newlog = new Logs({
      action: "delete",
      time: time,
      details: `User ${username} deleted the task titled '${title}'.`,
    });
    await newlog.save();
    res.status(200).json({ message: "Task Deleted Successfull" });
    io.emit("deletedtask", { deletedtask, newlog });
  } catch (error) {
    console.error(error);
  }
}

async function Update(req, res) {
  try {
    const io = getio();
    const time = new Date().toISOString();
    const { _id } = req.params;
    const username = req.user;
    const allowedFields = ["title", "description", "status", "priority"];
    const updatedata = { assignedUser: username, updatedAt: time };
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
    const newlog = new Logs({
      action: "update",
      time: time,
      details: `User ${username} updated the task titled '${updatedtask.title}'.`,
    });
    await newlog.save();
    res.status(201).json({ message: "Task Updated Successfull" });
    io.emit("updatedtask", { updatedtask, newlog });
  } catch (error) {
    console.error(error);
  }
}

async function Assign(req, res) {
  try {
    const io = getio();
    const { _id } = req.params;
    const username = req.user;
    const time = new Date().toISOString();
    const tasks = await Task.find({});
    const newusername = taskfuntion.smartassign(tasks);
    const updatedtask = await Task.findByIdAndUpdate(
      _id,
      { $set: { assignedUser: newusername, updatedAt: time } },
      { new: true }
    );
    const newlog = new Logs({
      action: "assign",
      time: time,
      details: `User ${username} assigned the task titled 
      '${updatedtask.title}' to ${newusername}.`,
    });
    await newlog.save();
    res.status(201).json({ message: "Task Assigned Successfull" });
    io.emit("assignedtask", { updatedtask, newlog });
  } catch (err) {
    console.error(err);
  }
}

export default { Add, Delete, Update, Get, Assign };
