import express from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  updateTask,
} from "../controllers/tasksControllers.js";
import { yupBodyMiddleware } from "../middleware/yupBodyMiddleware.js";
import { taskCreateReqSchema } from "../validation/schemas/taskCreateReqSchema.js";
import { taskUpdateReqSchema } from "../validation/schemas/taskUpdateReqSchema.js";

const router = express.Router();

router
  .route("/")
  .get(getAllTasks)
  .post(yupBodyMiddleware(taskCreateReqSchema), createTask);
router
  .route("/:id")
  .get(getTaskById)
  .patch(yupBodyMiddleware(taskUpdateReqSchema), updateTask)
  .delete(deleteTask);

export { router as taskRouter };
