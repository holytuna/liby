import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  publishBookController,
} from "../controllers/book.controller.js";

const router = Router();

router.post("/", authMiddleware, async(req, res) => { await publishBookController(req, res) });

export default router;