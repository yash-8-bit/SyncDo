import React, { useState, type FormEvent, type JSX } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import type { taskType } from "../types/task.type";
import Select from "../components/Select";
import { addTask } from "../apis/task.api";
import { useNavigate } from "react-router";
import Alert from "../components/Alert";
import type { AlertType } from "../types/alert.type";
import Loading from "../components/Loading";

// Add task page
function Addtask(): JSX.Element {
  const navigate = useNavigate();
  const status = ["ToDo", "In Progress", "Done"];
  const priority = ["Low", "Medium", "High"];
  const [loading, setloading] = useState<boolean>(false);
  const [alert, setalert] = useState<AlertType>({
    text: "",
  });
  const [formdata, setFormdata] = useState<taskType>({
    title: "",
    description: "",
    priority: "Medium",
    status: "ToDo",
  });

  // function to add  a task from the API
  const Add = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setloading(true);
      await addTask(formdata);
      navigate("/");
    } catch (error: any) {
      setloading(false);
      if (error.response && error.response.data) {
        setalert({ text: error.response.data.message });
        return;
      }
      setalert({ text: error.message });
    }
  };
  return (
    <>
      {loading && <Loading />}
      <div className="center">
        <div className="box">
          <h1 className="heading font">Add Task</h1>
          {alert.text && <Alert text={alert.text} cname={alert.cname} />}
          <form onSubmit={Add}>
            <Input
              value={formdata.title}
              heading="Enter title"
              onchange={(e) => {
                setFormdata((old) => ({ ...old, title: e.target.value }));
              }}
              placeholder="Title"
            />
            <Input
              heading="Enter description"
              value={formdata.description}
              onchange={(e) => {
                setFormdata((old) => ({ ...old, description: e.target.value }));
              }}
              placeholder="Description"
            />
            <Select
              options={status}
              heading="Select status"
              value={formdata.status}
              onchange={(e) => {
                setFormdata((old) => ({ ...old, status: e.target.value }));
              }}
            />
            <Select
              options={priority}
              heading="Select priority"
              value={formdata.priority}
              onchange={(e) => {
                setFormdata((old) => ({ ...old, priority: e.target.value }));
              }}
            />
            {/* task add button */}
            <Button cname="font" type="submit" text="submit" />
          </form>
        </div>
      </div>
    </>
  );
}

export default Addtask;
