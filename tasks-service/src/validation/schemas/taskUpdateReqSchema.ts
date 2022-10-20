import yup, { SchemaOf } from "yup";
import { TaskUpdatePayload } from "../../types/tasks/Task.js";

export const taskUpdateReqSchema: SchemaOf<TaskUpdatePayload> = yup
  .object()
  .shape({
    description: yup.string().trim().max(1000),
    dueDate: yup
      .date()
      .nullable()
      .transform((parsed, inp) => (inp === "" ? undefined : parsed)),
    durationMins: yup.number().integer().positive(),
    title: yup.string().trim().max(300),
  });
