import prisma from "../data/prisma.js";
import {
  Task,
  TaskCreatePayload,
  TaskUpdatePayload,
} from "../types/tasks/Task.js";

class TaskCrudService {
  async getAll(): Promise<Task[]> {
    return prisma.task.findMany();
  }

  async getById(id: string): Promise<Task | null> {
    return prisma.task.findFirst({ where: { id } });
  }

  async deleteById(id: string): Promise<Task | null> {
    try {
      return await prisma.task.delete({
        where: {
          id,
        },
      });
    } catch {
      return null;
    }
  }

  async createOne(task: TaskCreatePayload): Promise<Task> {
    return prisma.task.create({ data: task });
  }

  async updateOne(
    id: string,
    payload: TaskUpdatePayload
  ): Promise<Task | null> {
    try {
      return await prisma.task.update({
        data: payload,
        where: {
          id,
        },
      });
    } catch {
      return null;
    }
  }
}

export const taskCrudService = new TaskCrudService();
