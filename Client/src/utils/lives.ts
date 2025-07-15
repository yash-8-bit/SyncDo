import type { taskType } from "../types/task.type";

const addtasklive = (data: taskType, setTasks: any) => {
  setTasks((prevTasks: taskType[]) => [...prevTasks, data]);
};

const updatetasklive = (data: taskType, setTasks: any) => {
  setTasks((prevTasks: taskType[]) => [
    ...prevTasks.filter((item) => item._id !== data._id),
    data,
  ]);
};

const deletetasklive = (data: taskType, setTasks: any) => {
  setTasks((prevTasks: taskType[]) => [
    ...prevTasks.filter((item) => item._id !== data._id),
  ]);
};

export { addtasklive, updatetasklive, deletetasklive };
