export class TaskDto {
  id: string;
  title: string;
  description: string;
  durationMins: number;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
}
