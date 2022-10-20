export const ENV = {
  tasksApiPrefix: process.env.REACT_APP_TASKS_API_PREFIX || "/api/tasks/v1",
} as const;
