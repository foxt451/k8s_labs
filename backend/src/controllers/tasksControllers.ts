import { Request, Response } from "express";
import { taskService } from "../services/taskService.js";

export const getAllTasks = async (req: Request, res: Response) => {
  const tasks = await taskService.getAll();
  res.json(tasks);
};
