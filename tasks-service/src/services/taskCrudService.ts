import prisma from "../data/prisma.js";
import {
  Task,
  TaskCreatePayload,
  TaskUpdatePayload,
} from "../types/tasks/Task.js";

class TaskCrudService {
  async getAll(userId: string): Promise<Task[]> {
    return prisma.task.findMany({
      where: {
        userId,
      },
    });
  }

  async getById(id: string, userId: string): Promise<Task | null> {
    return prisma.task.findFirst({ where: { id, userId } });
  }

  async deleteById(id: string, userId: string): Promise<Task | null> {
    try {
      const task = await prisma.task.findFirst({
        where: {
          id,
          userId,
        },
      });
      if (!task) {
        return task;
      }
      return await prisma.task.delete({
        where: {
          id,
        },
      });
    } catch {
      return null;
    }
  }

  async createOne(task: TaskCreatePayload, userId: string): Promise<Task> {
    return prisma.task.create({ data: { ...task, userId } });
  }

  async updateOne(
    id: string,
    userId: string,
    payload: TaskUpdatePayload
  ): Promise<Task | null> {
    try {
      const task = await prisma.task.findFirst({
        where: {
          id,
          userId,
        },
      });
      if (!task) {
        return task;
      }
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
