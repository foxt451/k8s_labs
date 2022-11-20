import { TaskDto } from 'src/dto/taskDto';

export const mockTasks: TaskDto[] = [
  {
    id: 'cl9zw1ynm0000sn10i3lbxtr9',
    title: 'Do the dishes',
    description: 'Clean',
    dueDate: new Date('2022-11-24').toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    durationMins: 120,
  },
  {
    id: 'cl9zw1ynm0000sn10i3lbxtr9',
    title: 'Sleep',
    description: 'good',
    dueDate: new Date('2022-11-23').toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    durationMins: 540,
  },
];
