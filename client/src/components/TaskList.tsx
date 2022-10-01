import React, { FC, useEffect, useState } from "react";
import { ENV } from "../env";
import { Task } from "../types/tasks/Task";

const TaskList: FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const loadTasks = async () => {
      const response = await fetch(`${ENV.apiPrefix}/tasks`);
      const tasks = (await response.json()) as Task[];
      setTasks(tasks);
    };
    loadTasks();
  }, []);

  return (
    <ul>
      {tasks.map((task) => {
        return (
          <li key={task.id}>
            <>
              {task.title} due by {task.dueDate} ({task.durationMins} min)
            </>
          </li>
        );
      })}
    </ul>
  );
};

export default TaskList;
