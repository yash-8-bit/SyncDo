import React, { type JSX } from "react";
import type { taskCardType } from "../types/task.type";
import Button from "./Button";


// Card component for display task with drag and drop feature
function Card({ task, assignfunc, deletefunc, updatefunc }: taskCardType):JSX.Element {
  const priority = task.priority.toLowerCase();

  // function for enable drag feature
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("_task_data_", JSON.stringify(task));
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
        {/* task smart assign button */}
      {task.status !== "Done" &&  <Button
          text="Assign"
          func={() => assignfunc(task._id!)}
          cname="task-btn assign"
        /> }
         {/* task update button */}
        <Button
          text="Update"
          func={() => updatefunc(task._id!)}
          cname="task-btn update"
        />
         {/* task delete button */}
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
