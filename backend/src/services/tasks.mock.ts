import { Task } from "../types/tasks/Task.js";

export const tasks: Task[] = [
  {
    id: "1",
    title: "Do the dishes",
    durationMins: 60,
    dueDate: new Date(2022, 11, 21, 12),
  },
  {
    id: "2",
    title: "Walk the dog",
    durationMins: 30,
    dueDate: new Date(2022, 11, 21, 10),
  },
  {
    id: "3",
    title: "Write an essay",
    durationMins: 120,
    dueDate: new Date(2022, 11, 21, 18),
  },
];
