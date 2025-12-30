import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";
import { getAllUsers, updateStatus } from "../controllers/admin.controller.js";

const router = express.Router();

router.use(authMiddleware, roleMiddleware("admin"));

router.get("/users", getAllUsers);
router.patch("/users/:userId/status", updateStatus);

export default router;