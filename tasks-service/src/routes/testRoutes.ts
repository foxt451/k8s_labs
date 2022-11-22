import express from "express";
import { initDelay, testDelay } from "../controllers/testControllers.js";

const router = express.Router();

router.get("/initDelay", initDelay);
router.get("/testDelay", testDelay);

export { router as testRouter };

