import { Request, Response } from "express";
import { taskCrudService } from "../services/taskCrudService.js";
import { AuthenticatedRequest } from "../types/auth/AuthenticatedRequest.js";
import { TaskCreatePayload, TaskUpdatePayload } from "../types/tasks/Task.js";

export const getAllTasks = async (req: Request, res: Response) => {
  const tasks = await taskCrudService.getAll(
    (req as AuthenticatedRequest).user.id
  );
  res.json(tasks);
};

export const getTaskById = async (req: Request, res: Response) => {
  const task = await taskCrudService.getById(
    req.params.id,
    (req as AuthenticatedRequest).user.id
  );
  res.json(task);
};

export const createTask = async (
  req: Request<unknown, unknown, TaskCreatePayload>,
  res: Response
) => {
  const createdTask = await taskCrudService.createOne(
    req.body,
    (req as AuthenticatedRequest).user.id
  );
  res.status(201).json(createdTask);
};

export const updateTask = async (req: Request, res: Response) => {
  const updatedTask = await taskCrudService.updateOne(
    req.params.id,
    (req as AuthenticatedRequest).user.id,
    req.body as TaskUpdatePayload
  );
  res.json(updatedTask);
};

export const deleteTask = async (req: Request, res: Response) => {
  const deletedTask = await taskCrudService.deleteById(
    req.params.id,
    (req as AuthenticatedRequest).user.id
  );
  res.json(deletedTask);
};
