import { Task } from "../types/tasks/Task.js";
import { tasks } from "./tasks.mock.js";

class TaskService {
  async getAll(): Promise<Task[]> {
    return tasks
  }
}

export const taskService = new TaskService()