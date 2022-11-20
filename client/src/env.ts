export const ENV = {
  tasksApiPrefix: process.env.REACT_APP_TASKS_API_PREFIX || "/api/tasks/v1",
  authApiPrefix: process.env.REACT_APP_AUTH_API_PREFIX || "/api/auth/v1",
  schedulerApiPrefix: process.env.REACT_APP_SCHEDULER_API_PREFIX || "/api/scheduler/v1",
} as const;
