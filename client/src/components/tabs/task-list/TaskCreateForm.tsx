import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { TaskCreatePayload } from "../../../types/tasks/Task";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useAppDispatch } from "../../../hooks/redux";
import { createTask } from "../../../store/slices/task-slice";
import { DateTimePicker } from "@mui/x-date-pickers";
import TextField from "@mui/material/TextField";

type Inputs = TaskCreatePayload;

const TaskCreateForm = () => {
  const { register, handleSubmit, control } = useForm<Inputs>();
  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(createTask(data));
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3" controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter title"
          {...register("title")}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="desc">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" {...register("description")} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="durationMins">
        <Form.Label>Duration (in mins)</Form.Label>
        <Form.Control
          type="number"
          defaultValue={10}
          {...register("durationMins")}
        />
      </Form.Group>

      <Form.Group className="my-3">
        <Controller
          name="dueDate"
          control={control}
          defaultValue={null}
          render={({ field }) => (
            <DateTimePicker
              renderInput={(props) => <TextField {...props} />}
              label="Deadline"
              {...field}
            />
          )}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default TaskCreateForm;
