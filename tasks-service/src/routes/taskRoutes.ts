import express from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  updateTask,
} from "../controllers/tasksControllers.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { yupBodyMiddleware } from "../middleware/yupBodyMiddleware.js";
import { taskCreateReqSchema } from "../validation/schemas/taskCreateReqSchema.js";
import { taskUpdateReqSchema } from "../validation/schemas/taskUpdateReqSchema.js";

const router = express.Router();

router
  .route("/")
  .get(authMiddleware, getAllTasks)
  .post(authMiddleware, yupBodyMiddleware(taskCreateReqSchema), createTask);
router
  .route("/:id")
  .get(authMiddleware, getTaskById)
  .patch(authMiddleware, yupBodyMiddleware(taskUpdateReqSchema), updateTask)
  .delete(authMiddleware, deleteTask);

export { router as taskRouter };
