import express from "express";
import { checkEmail, register, login, getProfile } from "../controllers/authController.js";

const router = express.Router();

// Check if email exists
router.post("/check-email", checkEmail);

// Register user (role-based)
router.post("/register", register);

// Login user
router.post("/login", login);

// Get profile
router.get("/profile", getProfile);

export default router;
