import type { taskType } from "../types/task.type";

// live task add function
const addtasklive = (data: taskType, setTasks: any): void => {
  setTasks((prevTasks: taskType[]) => [...prevTasks, data]);
};

// live task update function
const updatetasklive = (data: taskType, setTasks: any): void => {
  setTasks((prevTasks: taskType[]) => [
    ...prevTasks.filter((item) => item._id !== data._id),
    data,
  ]);
};

// live task delete function
const deletetasklive = (data: taskType, setTasks: any): void => {
  setTasks((prevTasks: taskType[]) => [
    ...prevTasks.filter((item) => item._id !== data._id),
  ]);
};

export { addtasklive, updatetasklive, deletetasklive };
