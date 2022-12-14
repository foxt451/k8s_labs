import { Task } from "@prisma/client";
import { TaskTopicItem } from "../types/tasks/TaskTopicItem.js";

export const taskToTopicItem = (task: Task): TaskTopicItem["task"] => ({
  id: task.id,
  createdAt: task.createdAt.toISOString(),
  description: task.description,
  dueDate: task.dueDate?.toISOString() ?? null,
  durationMins: task.durationMins,
  title: task.title,
  updatedAt: task.updatedAt.toISOString(),
  userId: task.userId,
});
