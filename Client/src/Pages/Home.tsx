import React, { useEffect, useState } from "react";
import type { taskStatustype, taskType } from "../types/task.type";
import { getTask } from "../apis/task";
import socket from "../utils/socket";
import Card from "../components/Card";
import { addtasklive, deletetasklive, updatetasklive } from "../utils/lives";
import type { LogsType } from "../types/layout.types";
import { getLogs } from "../apis/logs";
import Alert from "../components/Alert";
import Loading from "../components/Loading";
import type { AlertType } from "../types/alert.type";

function Home() {
  const [tasks, setTasks] = useState<taskStatustype>({
    ToDo: [],
    "In Progress": [],
    Done: [],
  });
  const [loading, setloading] = useState<boolean>(false);
  const [alert, setalert] = useState<AlertType>({
    text: "",
  });
  const [logs, setLogs] = useState<LogsType[]>([]);
  const get = async () => {
    try {
      setloading(true);
      const data1 = await getTask();
      setTasks(data1.data);
      const data2 = await getLogs();
      setLogs(data2.data);
      setloading(false);
    } catch (error: any) {
      setloading(false);
      if (error.response && error.response.data) {
        setalert({ text: error.response.data.message });
        return;
      }
      setalert({ text: error.message });
    }
  };
  useEffect(() => {
    get();
    socket.on("addedtask", (data) => {
      addtasklive(data.newtask, setTasks);
      setLogs((prevlogs) => [...prevlogs, data.newlog]);
    });
    socket.on("updatedtask", (data) => {
      updatetasklive(data.updatedtask, setTasks);
      setLogs((prevlogs) => [...prevlogs, data.newlog]);
    });
    socket.on("deletedtask", (data) => {
      deletetasklive(data.deletedtask, setTasks);
      setLogs((prevlogs) => [...prevlogs, data.newlog]);
    });
    socket.on("assignedtask", (data) => {
      updatetasklive(data.updatedtask, setTasks);
      setLogs((prevlogs) => [...prevlogs, data.newlog]);
    });
    return () => {
      socket.off("addtask");
    };
  }, []);
  return (
    <>
      {loading && <Loading />}
      {alert.text && <Alert text={alert.text} cname="error" />}
      <div className="container">
        <div className="homecontaier">
          <ol className="logging">
            {logs.map((item, i) => (
              <li className="log-paragraph" key={i}>
                {item.details}
              </li>
            ))}
          </ol>

          <div className="board">
            <div className="boardcol">
              <h1 className="boardheading todo font">ToDo</h1>
              {tasks.ToDo.map((item, i) => (
                <Card key={i} task={item} />
              ))}
            </div>
            <div className="boardcol">
              <h1 className="boardheading inprogress font">In Progress</h1>
              {tasks["In Progress"].map((item, i) => (
                <Card key={i} task={item} />
              ))}
            </div>
            <div className="boardcol">
              <h1 className="boardheading done font">Done</h1>
              {tasks.Done.map((item, i) => (
                <Card key={i} task={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
