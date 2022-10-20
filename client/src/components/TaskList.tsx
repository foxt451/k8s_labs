import React, { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { loadTasks, TasksStatus } from "../store/slices/task-slice";
import TaskCard from "./TaskCard";
import Stack from "react-bootstrap/Stack";
import { TaskUpdatePayload } from "../types/tasks/Task";

type Inputs = TaskUpdatePayload;

const TaskList: FC = () => {
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const status = useAppSelector((state) => state.tasks.status);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === TasksStatus.IDLE) {
      dispatch(loadTasks());
    }
  }, [dispatch, status]);

  return (
    <Stack gap={2}>
      {tasks.map((task) => {
        return <TaskCard key={task.id} task={task} />;
      })}
    </Stack>
  );
};

export default TaskList;
