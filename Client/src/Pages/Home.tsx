import React, { useEffect, useState } from "react";
import type { taskStatustype } from "../types/task.type";
import { getTask } from "../apis/task";

function Home() {
  const [tasks, setTasks] = useState<taskStatustype>({
    ToDo: [],
    "In Progress": [],
    Done: [],
  });
  const get = async () => {
    try {
      const data = await getTask();
      setTasks(data.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    get();
  }, []);
  return (
    <div className="container">
      <div className="homecontaier">
        <div className="logs">logs...</div>
        <div className="board">
          <div className="boardcol">
            <h1 className="boardheading todo font">ToDo</h1>
          </div>
          <div className="boardcol">
            <h1 className="boardheading inprogress font">In Progress</h1>
          </div>
          <div className="boardcol">
            <h1 className="boardheading done font">Done</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
