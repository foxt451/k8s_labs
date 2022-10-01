import express from "express";
import { getAllTasks } from "../controllers/tasksControllers.js";

const router = express.Router();

router.get("/", getAllTasks);

export { router as taskRouter };
