import React from "react";
import type { taskCardType, taskType } from "../types/task.type";
import Button from "./Button";
import { useNavigate } from "react-router";
import { assignTask, deleteTask } from "../apis/task.api";

function Card({ task, assignfunc, deletefunc, updatefunc }: taskCardType) {
  const navigate = useNavigate();
  const priority = task.priority.toLowerCase();
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("taskId", JSON.stringify(task));
    event.dataTransfer.effectAllowed = "move";
  };
  return (
    <div draggable onDragStart={handleDragStart} className="task-card font">
      <div className="task-header">
        <h2 className="task-title">{task.title}</h2>
        <span className={`task-priority ${priority}`}>{task.priority}</span>
      </div>
      <p className="task-description">{task.description}</p>
      <div className="task-footer">
        <span className="task-user">{task.assignedUser}</span>
      </div>
      <div className="task-buttons">
        <Button
          text="Assign"
          func={() => assignfunc(task._id!)}
          cname="task-btn assign"
        />
        <Button
          text="Update"
          func={() => updatefunc(task._id!)}
          cname="task-btn update"
        />
        <Button
          text="Delete"
          func={() => deletefunc(task._id!)}
          cname="task-btn delete"
        />
      </div>
    </div>
  );
}

export default Card;
