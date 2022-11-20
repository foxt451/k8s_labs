import React from "react";
import { Stack } from "react-bootstrap";
import TaskCreateForm from "./TaskCreateForm";
import TaskList from "./TaskList";

const TasksPage = () => {
  return (
    <Stack gap={5}>
      <TaskCreateForm />
      <TaskList />
    </Stack>
  );
};

export default TasksPage;
