export enum TaskOp {
  CREATED = 'CREATED',
  DELETED = 'DELETED',
  UPDATED = 'UPDATED',
}

export type TaskTopicItem = {
  op: TaskOp;
  task: {
    id: string;
    title: string;
    userId: string;
    description: string;
    durationMins: number;
    dueDate: string | null;
    createdAt: string;
    updatedAt: string;
  };
};
