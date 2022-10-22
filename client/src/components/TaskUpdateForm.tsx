import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { Task, TaskUpdatePayload } from "../types/tasks/Task";
import Form from "react-bootstrap/Form";
import { useAppDispatch } from "../hooks/redux";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { updateTask } from "../store/slices/task-slice";
import { DateTimePicker } from "@mui/x-date-pickers";
import TextField from "@mui/material/TextField";

type Inputs = TaskUpdatePayload;

const TaskUpdateForm = ({
  task,
  setIsEditing,
}: {
  task: Task;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, control } = useForm<Inputs>({
    defaultValues: {
      title: task.title,
      description: task.description,
      durationMins: task.durationMins,
      dueDate: task.dueDate ?? null,
    },
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(updateTask({ id: task.id, payload: data }));
    setIsEditing(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <Card.Header>
          <Form.Group className="my-3">
            <Controller
              name="dueDate"
              control={control}
              render={({ field }) => (
                <DateTimePicker
                  renderInput={(props) => <TextField {...props} />}
                  label="Deadline"
                  {...field}
                />
              )}
            />
          </Form.Group>
        </Card.Header>
        <Card.Body>
          <Card.Title>
            <Form.Group className="mb-3" controlId={`title-${task.id}`}>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                {...register("title")}
              />
            </Form.Group>
          </Card.Title>
          <Card.Subtitle></Card.Subtitle>
          <Form.Group className="mb-3" controlId={`desc-${task.id}`}>
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" {...register("description")} />
          </Form.Group>
          <ButtonGroup size="sm">
            <Button type="submit" variant="warning">
              Save
            </Button>
          </ButtonGroup>
        </Card.Body>
        <Card.Footer>
          <Form.Group className="mb-3" controlId={`durationMins-${task.id}`}>
            <Form.Label>Duration (in mins)</Form.Label>
            <Form.Control
              type="number"
              defaultValue={10}
              {...register("durationMins")}
            />
          </Form.Group>
        </Card.Footer>
      </Card>
    </form>
  );
};

export default TaskUpdateForm;
