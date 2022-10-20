import yup, { SchemaOf } from "yup";
import { TaskCreatePayload } from "../../types/tasks/Task.js";

export const taskCreateReqSchema: SchemaOf<TaskCreatePayload> = yup
  .object()
  .shape({
    description: yup.string().trim().max(1000),
    dueDate: yup
      .date()
      .nullable()
      .transform((parsed, inp) => (inp === "" ? undefined : parsed)),
    durationMins: yup.number().integer().positive().required(),
    title: yup.string().trim().max(300).required(),
  });
