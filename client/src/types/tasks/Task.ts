export type Task = {
  id: string;
  title: string;
  description: string;
  durationMins: number;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
};

export type TaskCreatePayload = Omit<
  Task,
  "id" | "createdAt" | "updatedAt" | "description" | "dueDate"
> & {
  description?: string;
  dueDate?: string | null;
};
export type TaskUpdatePayload = Partial<TaskCreatePayload>;
