import type { taskStatustype, taskType } from "../types/task.type";

const addtasklive = (data: taskType, setTasks: any) => {
  switch (data.status) {
    case "ToDo": {
      setTasks((prevTasks: taskStatustype) => ({
        ...prevTasks,
        ToDo: [...prevTasks.ToDo, data],
      }));
      return;
    }
    case "Done": {
      setTasks((prevTasks: taskStatustype) => ({
        ...prevTasks,
        Done: [...prevTasks.Done, data],
      }));
      return;
    }
    case "In Progress":
      setTasks((prevTasks: taskStatustype) => ({
        ...prevTasks,
        "In Progress": [...prevTasks["In Progress"], data],
      }));
  }
};

const updatetasklive = (data: taskType, setTasks: any) => {
  switch (data.status) {
    case "ToDo": {
      setTasks((prevTasks: taskStatustype) => ({
        ...prevTasks,
        ToDo: [
          ...prevTasks["ToDo"].filter((item) => item._id !== data._id),
          data,
        ],
      }));
      return;
    }
    case "Done": {
      setTasks((prevTasks: taskStatustype) => ({
        ...prevTasks,
        Done: [
          ...prevTasks["Done"].filter((item) => item._id !== data._id),
          data,
        ],
      }));
      return;
    }
    case "In Progress":
      setTasks((prevTasks: taskStatustype) => ({
        ...prevTasks,
        "In Progress": [
          ...prevTasks["In Progress"].filter((item) => item._id !== data._id),
          data,
        ],
      }));
  }
};

const deletetasklive = (data: taskType, setTasks: any) => {
  switch (data.status) {
    case "ToDo": {
      setTasks((prevTasks: taskStatustype) => ({
        ...prevTasks,
        ToDo: [...prevTasks["ToDo"].filter((item) => item._id !== data._id)],
      }));
      return;
    }
    case "Done": {
      setTasks((prevTasks: taskStatustype) => ({
        ...prevTasks,
        Done: [...prevTasks["Done"].filter((item) => item._id !== data._id)],
      }));
      return;
    }
    case "In Progress":
      setTasks((prevTasks: taskStatustype) => ({
        ...prevTasks,
        "In Progress": [
          ...prevTasks["In Progress"].filter((item) => item._id !== data._id),
        ],
      }));
  }
};

export { addtasklive, updatetasklive, deletetasklive };
