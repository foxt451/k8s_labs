import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { Task } from "../types/tasks/Task";
import Form from "react-bootstrap/Form";
import { useAppDispatch } from "../hooks/redux";
import { completeTask, deleteTask } from "../store/slices/task-slice";

const TaskDisplayCard = ({
  task,
  setIsEditing,
}: {
  task: Task;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dispatch = useAppDispatch();
  return (
    <Card>
      {task.dueDate && (
        <Card.Header>
          <>
            Due by {new Date(task.dueDate).toDateString()}{" "}
            {new Date(task.dueDate).toLocaleTimeString()}
          </>
        </Card.Header>
      )}
      <Card.Body>
        <Card.Title>
          <Form.Check
            type="checkbox"
            id={`complete-${task.id}`}
            inline
            onClick={() => {
              dispatch(completeTask(task.id));
            }}
          />
          {task.title}
        </Card.Title>
        <Card.Subtitle></Card.Subtitle>
        <Card.Text>{task.description}</Card.Text>
        <ButtonGroup size="sm">
          <Button
            variant="danger"
            onClick={() => {
              dispatch(deleteTask(task.id));
            }}
          >
            Delete
          </Button>
          <Button onClick={() => setIsEditing((value) => !value)}>Edit</Button>
        </ButtonGroup>
      </Card.Body>
      <Card.Footer>{task.durationMins} mins</Card.Footer>
    </Card>
  );
};

export default TaskDisplayCard;
