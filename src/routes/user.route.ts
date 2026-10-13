import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  getUsersController,
  getUserController,
  createUserController,
  deleteUserController,
  updateUserController,
  loginUserController, 
} from "../controllers/user.controller.js";

const router = Router();

router.get("/", authMiddleware, async(req, res) => { await getUsersController(req, res) });
router.get("/:id", async(req, res) => { await getUserController(req, res) });
router.post("/", async(req, res) => { await createUserController(req, res) });
router.delete("/:id", async(req, res) => { await deleteUserController(req, res) });
router.put("/:id", async(req, res) => { await updateUserController(req, res) });
router.post("/login", async(req, res) => { await loginUserController(req, res) });

export default router;
