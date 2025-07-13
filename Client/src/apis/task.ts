import type { taskType } from "../types/task.type";
import ls from "../utils/ls";
import Call from "./setting";

const token = ls.get();
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const getTask = async () => {
  let response = await Call.get("/task/get", config);
  return response.data;
};

const addTask = async ({ title, description, status, priority }: taskType) => {
  let response = await Call.post(
    "/task/add",
    { title, description, status, priority },
    config
  );
  return response.data;
};

const deleteTask = async (_id: string) => {
  let response = await Call.delete(`/task/update/${_id}`, config);
  return response.data;
};

const updateTask = async (_id: string) => {
  let response = await Call.put(`/task/delete/${_id}`, config);
  return response.data;
};

export { addTask, deleteTask, updateTask, getTask };
