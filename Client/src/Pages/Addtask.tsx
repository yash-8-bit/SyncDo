import React, { useState, type FormEvent } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import type { taskType } from "../types/task.type";
import Select from "../components/Select";
import { addTask } from "../apis/task";
import { useNavigate } from "react-router";

function Addtask() {
  const navigate = useNavigate();
  const status = ["ToDo", "In Progress", "Done"];
  const priority = ["Low", "Medium", "High"];
  const [formdata, setFormdata] = useState<taskType>({
    title: "",
    description: "",
    priority: "Medium",
    status: "ToDo",
  });
  const Add = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await addTask(formdata);
      navigate("/");
      console.info(data);
    } catch (error: any) {
      console.error(error);
    }
  };
  return (
    <div className="center">
      <div className="box">
        <h1 className="heading font">Add Task</h1>
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
          <Button cname="font" type="submit" text="submit" />
        </form>
      </div>
    </div>
  );
}

export default Addtask;
