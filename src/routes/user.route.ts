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

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved users
 */
router.get("/", authMiddleware, async(req, res) => { await getUsersController(req, res) });
router.get("/:id", async(req, res) => { await getUserController(req, res) });
/**
 * @openapi
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: StrongPassword123!
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized
 *       409:
 *         description: Email already exists
 */
router.post("/", async(req, res) => { await createUserController(req, res) });
router.delete("/:id", async(req, res) => { await deleteUserController(req, res) });
router.put("/:id", async(req, res) => { await updateUserController(req, res) });
router.post("/login", async(req, res) => { await loginUserController(req, res) });

export default router;
