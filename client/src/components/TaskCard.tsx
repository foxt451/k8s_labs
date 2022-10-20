import React, { useState } from "react";
import { Task } from "../types/tasks/Task";
import TaskDisplayCard from "./TaskDisplayCard";
import TaskUpdateForm from "./TaskUpdateForm";

const TaskCard = ({ task }: { task: Task }) => {
  const [isEditing, setIsEditing] = useState(false);
  return isEditing ? (
    <TaskUpdateForm task={task} setIsEditing={setIsEditing} />
  ) : (
    <TaskDisplayCard task={task} setIsEditing={setIsEditing} />
  );
};

export default TaskCard;
