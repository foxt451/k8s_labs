import React from "react";
import TaskCreateForm from "./components/TaskCreateForm";
import TaskList from "./components/TaskList";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";

function App() {
  return (
    <Container className="py-3">
      <Stack gap={5}>
        <TaskCreateForm />
        <TaskList />
      </Stack>
    </Container>
  );
}

export default App;
