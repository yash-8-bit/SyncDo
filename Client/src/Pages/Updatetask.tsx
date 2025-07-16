import { useEffect, useState, type FormEvent, type JSX } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import type { taskType } from "../types/task.type";
import Select from "../components/Select";
import { getoneTask, updateTask } from "../apis/task.api";
import { useNavigate, useParams } from "react-router";
import type { AlertType } from "../types/alert.type";
import Alert from "../components/Alert";
import Loading from "../components/Loading";


// Task update  page
function Updatetask() :JSX.Element{
  const { id } = useParams();
  const navigate = useNavigate();
  const status = ["ToDo", "In Progress", "Done"];
  const priority = ["Low", "Medium", "High"];
  const [loading, setloading] = useState<boolean>(false);
  const [alert, setalert] = useState<AlertType>({
    text: "",
  });
  const [formdata, setFormdata] = useState<taskType>({
    _id: "",
    title: "",
    description: "",
    priority: "Medium",
    status: "ToDo",
  });

  // function to update  a task from the API
  const Update = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setloading(true);
      await updateTask(formdata);
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

  // function to fetch one task through the API
  const getone = async () => {
    if (!id) return navigate("/");
    try {
      setloading(true);
      const data = await getoneTask(id);
      setFormdata(data.data);
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
    getone();
  }, []);
  return (
    <>
      {loading && <Loading />}
      <div className="center">
        <div className="box">
          <h1 className="heading font">Update Task</h1>
          {alert.text && <Alert text={alert.text} cname={alert.cname} />}
          <form onSubmit={Update}>
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
            {/* task update button */}
            <Button cname="font" type="submit" text="submit" />
          </form>
        </div>
      </div>
    </>
  );
}

export default Updatetask;
