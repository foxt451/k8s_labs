import { Task as PrismaTask, Prisma } from "@prisma/client";

export type Task = PrismaTask;
export type TaskCreatePayload = Omit<
  Task,
  "id" | "createdAt" | "updatedAt" | "description" | "dueDate" | "userId"
> & {
  description?: string;
  dueDate?: Date | null;
};
export type TaskUpdatePayload = Partial<TaskCreatePayload>;
