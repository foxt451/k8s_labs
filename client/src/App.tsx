import React from "react";
import TaskCreateForm from "./components/TaskCreateForm";
import TaskList from "./components/TaskList";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import Header from "./components/Header";
import { useAppSelector } from "./hooks/redux";

function App() {
  const user = useAppSelector((state) => state.auth.user);
  return (
    <Container className="py-3">
      <Header />
      {user && (
        <Stack gap={5}>
          <TaskCreateForm />
          <TaskList />
        </Stack>
      )}
    </Container>
  );
}

export default App;
