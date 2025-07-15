import React, { useEffect, useState } from "react";
import type { taskType } from "../types/task.type";
import {
  assignTask,
  deleteTask,
  getTask,
  updateTaskStatus,
} from "../apis/task.api";
import socket from "../utils/socket";
import Card from "../components/Card";
import { addtasklive, deletetasklive, updatetasklive } from "../utils/lives";
import type { LogsType } from "../types/layout.types";
import { getLogs } from "../apis/logs.api";
import Alert from "../components/Alert";
import Loading from "../components/Loading";
import type { AlertType } from "../types/alert.type";
import Button from "../components/Button";
import { useNavigate } from "react-router";

function Home() {
  const navigate = useNavigate();
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [show, setshow] = useState<boolean>(false);
  const [tasks, setTasks] = useState<taskType[]>([]);
  const [loading, setloading] = useState<boolean>(false);
  const [alert, setalert] = useState<AlertType>({
    text: "",
  });
  const [logs, setLogs] = useState<LogsType[]>([]);
  const handle_error = (error: any) => {
    setloading(false);
    if (error.response && error.response.data) {
      setalert({ text: error.response.data.message });
      return;
    }
    setalert({ text: error.message });
  };

  const get = async () => {
    try {
      setloading(true);
      const data1 = await getTask();
      setTasks(data1.data);
      const data2 = await getLogs();
      setLogs(data2.data);
      setloading(false);
    } catch (error: any) {
      handle_error(error);
    }
  };
  const Delete = async (_id: string) => {
    try {
      setloading(true);
      await deleteTask(_id);
      setloading(false);
    } catch (error: any) {
      handle_error(error);
    }
  };
  const Assign = async (_id: string) => {
    try {
      setloading(true);
      await assignTask(_id);
      setloading(false);
    } catch (error: any) {
      handle_error(error);
    }
  };
  const handledrop = async (
    e: React.DragEvent<HTMLDivElement>,
    currentstatus: string
  ) => {
    e.preventDefault();
    try {
      const d = e.dataTransfer.getData("taskId");
      const data: taskType = JSON.parse(d);
      if (data.status == currentstatus) return;
      data.status = currentstatus;
      setloading(true);
      await updateTaskStatus(data);
      setloading(false);
    } catch (error: any) {
      handle_error(error);
    }
  };
  useEffect(() => {
    get();
    socket.on("addedtask", (data) => {
      addtasklive(data.newtask, setTasks);
      setLogs((prevlogs) => [data.newlog, ...prevlogs].slice(0, 20));
    });
    socket.on("updatedtask", (data) => {
      updatetasklive(data.updatedtask, setTasks);
      setLogs((prevlogs) => [data.newlog, ...prevlogs].slice(0, 20));
    });
    socket.on("deletedtask", (data) => {
      deletetasklive(data.deletedtask, setTasks);
      setLogs((prevlogs) => [data.newlog, ...prevlogs].slice(0, 20));
    });
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => {
      socket.off("addtask");
    };
  }, []);
  return (
    <>
      {loading && <Loading />}
      {alert.text && <Alert text={alert.text} cname="error" />}
      <div className="homecontainer font">
        {(show || width > 768) && (
          <div className="logcontainer">
            {width < 100 && (
              <Button
                func={() => setshow(false)}
                text="hide logs"
                cname="toggle font"
              />
            )}
            <h1 className="logheading font">Logs</h1>
            <ul className="logs">
              {logs.map((item, i) => (
                <li className="log-paragraph" key={i}>
                  {item.details}
                </li>
              ))}
            </ul>
          </div>
        )}
        {width < 768 && (
          <Button
            func={() => setshow(true)}
            text="Show logs"
            cname="toggle font"
          />
        )}
        <div className="board">
          <div
            className="boardcol"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handledrop(e, "ToDo")}
          >
            <h1 className="boardheading todo font">ToDo</h1>
            {tasks
              .filter((item) => item.status === "ToDo")
              .map((item, i) => (
                <Card
                  updatefunc={(_id) => navigate(`/update-task/${_id}`)}
                  deletefunc={Delete}
                  assignfunc={Assign}
                  key={i}
                  task={item}
                />
              ))}
          </div>
          <div
            className="boardcol"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handledrop(e, "In Progress")}
          >
            <h1 className="boardheading inprogress font">In Progress</h1>
            {tasks
              .filter((item) => item.status === "In Progress")
              .map((item, i) => (
                <Card
                  updatefunc={(_id) => navigate(`/update-task/${_id}`)}
                  deletefunc={Delete}
                  assignfunc={Assign}
                  key={i}
                  task={item}
                />
              ))}
          </div>
          <div
            className="boardcol"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handledrop(e, "Done")}
          >
            <h1 className="boardheading done font">Done</h1>
            {tasks
              .filter((item) => item.status === "Done")
              .map((item, i) => (
                <Card
                  updatefunc={(_id) => navigate(`/update-task/${_id}`)}
                  deletefunc={Delete}
                  assignfunc={Assign}
                  key={i}
                  task={item}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
