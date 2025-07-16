import type { taskType } from "../types/task.type";
import ls from "../utils/ls";
import Call from "./setting";

const token = ls.get();


// config setup for Authorization
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};



// this is a GET request to fetch all tasks
const getTask = async () => {
  let response = await Call.get("/task/get", config);
  return response.data;
};


// this is a GET request to fetch one task by its DB _id
const getoneTask = async (_id: string) => {
  let response = await Call.get(`/task/getone/${_id}`, config);
  return response.data;
};

// this is a POST request to add one task 
const addTask = async ({ title, description, status, priority }: taskType) => {
  let response = await Call.post(
    "/task/add",
    { title, description, status, priority },
    config
  );
  return response.data;
};


// this is a DELETE request to delete one task 
const deleteTask = async (_id: string) => {
  let response = await Call.delete(`/task/delete/${_id}`, config);
  return response.data;
};

// this is a PUT request to update one task 
const updateTask = async ({
  _id,
  title,
  description,
  status,
  priority,
}: taskType) => {
  let response = await Call.put(
    `/task/update/${_id}`,
    { title, description, status, priority },
    config
  );
  return response.data;
};


// this is a PUT request to smart assign task that have minimum no of active task  
const assignTask = async (_id: string) => {
  let response = await Call.put(`/task/assign/${_id}`, {}, config);
  return response.data;
};

// this is a PUT request to update task status  
const updateTaskStatus = async ({ _id, status }: taskType) => {
  let response = await Call.put(
    `/task/update-status/${_id}`,
    { status },
    config
  );
  return response.data;
};

export {
  addTask,
  deleteTask,
  updateTask,
  getTask,
  assignTask,
  getoneTask,
  updateTaskStatus,
};
