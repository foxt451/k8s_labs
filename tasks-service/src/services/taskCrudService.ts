import prisma from "../data/prisma.js";
import { taskToTopicItem } from "../helpers/taskToTopicItem.js";
import {
  Task,
  TaskCreatePayload,
  TaskUpdatePayload,
} from "../types/tasks/Task.js";
import { TaskOp } from "../types/tasks/TaskTopicItem.js";
import { brokerService } from "./brokerService.js";

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
      const deletedTask = await prisma.task.delete({
        where: {
          id,
        },
      });
      await brokerService.emitTaskUpdate({
        op: TaskOp.DELETED,
        task: taskToTopicItem(deletedTask),
      });
      return deletedTask;
    } catch {
      return null;
    }
  }

  async createOne(task: TaskCreatePayload, userId: string): Promise<Task> {
    const createdTask = await prisma.task.create({ data: { ...task, userId } });
    await brokerService.emitTaskUpdate({
      op: TaskOp.CREATED,
      task: taskToTopicItem(createdTask),
    });
    return createdTask;
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
      const updatedTask = await prisma.task.update({
        data: payload,
        where: {
          id,
        },
      });
      await brokerService.emitTaskUpdate({
        op: TaskOp.UPDATED,
        task: taskToTopicItem(updatedTask),
      });
      return updatedTask;
    } catch {
      return null;
    }
  }
}

export const taskCrudService = new TaskCrudService();
