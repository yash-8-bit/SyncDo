import Logs from "../models/Logs.js";
import Task from "../models/Task.js";
import { getio } from "../socketHandler.js";
import taskfuntion from "../utils/taskfuntion.js";

// Function to fetch a single task from the database
async function Getone(req, res) {
  try {
    const { _id } = req.params;
    const response = await Task.findById(_id);
    res.status(200).json({ data: response });
  } catch (error) {
    console.log(error);
  }
}

// Function to fetch all task from the database
async function Get(req, res) {
  try {
    const status = ["ToDo", "In Progress", "Done"];
    const response = await Task.find({});
    const task = { ToDo: [], "In Progress": [], Done: [] };
    status.forEach((s) => {
      task[s] = response.filter((item) => item.status === s);
    });
    res.status(200).json({ data: response });
  } catch (error) {
    console.log(error);
  }
}

// Function to add a task to the database
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

// Function to delete a task to the database
async function Delete(req, res) {
  try {
    const io = getio();
    const time = new Date().toISOString();
    const { _id } = req.params;
    const username = req.user;
    const deletedtask = await Task.findByIdAndDelete(_id);
    const newlog = new Logs({
      action: "delete",
      time: time,
      details: `User ${username} deleted the task titled '${deletedtask.title}'.`,
    });
    await newlog.save();
    res.status(200).json({ message: "Task Deleted Successfull" });
    io.emit("deletedtask", { deletedtask, newlog });
  } catch (error) {
    console.error(error);
  }
}

// Function to update a task to the database
async function Update(req, res) {
  try {
    const io = getio();
    const time = new Date().toISOString();
    const { _id } = req.params;
    const username = req.user;
    const { title, description, status, priority } = req.body;
    const updatedata = {
      assignedUser: username,
      updatedAt: time,
      title: title,
      description: description,
      status: status,
      priority: priority,
    };
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

// Function to assign a task to a user and save it in the database
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
    io.emit("updatedtask", { updatedtask, newlog });
  } catch (err) {
    console.error(err);
  }
}

// Function to assign a task to a user and save it in the database
async function Updatestatus(req, res) {
  try {
    const io = getio();
    const { _id } = req.params;
    const username = req.user;
    const { status } = req.body;
    const time = new Date().toISOString();
    const updatedtask = await Task.findByIdAndUpdate(
      _id,
      { $set: { status: status, updatedAt: time } },
      { new: true }
    );
    const newlog = new Logs({
      action: "drag-drop",
      time: time,
      details: `User ${username} dragged the task titled 
      '${updatedtask.title}' to ${updatedtask.status}.`,
    });
    await newlog.save();
    res.status(201).json({ message: "Task Dragged Successfull" });
    io.emit("updatedtask", { updatedtask, newlog });
  } catch (err) {
    console.error(err);
  }
}

export default { Add, Delete, Update, Get, Assign, Getone, Updatestatus };
