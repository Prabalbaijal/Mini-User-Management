import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  getProfile,
  updateProfile,
  changePassword
} from "../controllers/user.controller.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/profile", getProfile);
router.put("/profile", updateProfile);
router.put("/change-password", changePassword);

export default router;
