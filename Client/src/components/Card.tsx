import React, { useState } from "react";
import type { taskType } from "../types/task.type";

function Card({ task }: { task: taskType }) {
  return (
    <div>
      <div className="task-card">
        <div className="task-header">
          <h2 className="task-title font">{task.title}</h2>
          <span className="task-priority low">{task.priority}</span>
        </div>
        <p className="task-description">{task.description}</p>
        <div className="task-footer">
          <span className="task-user">{task.assignedUser}</span>
          <span className="task-status done">{task.status}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
