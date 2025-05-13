import express from "express";
import {
  register,
  verifyEmail,
  adminLogin,
  checkAuth,
  logout,
} from "../controllers/auth.controller.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

// Registration Route
router.post("/register", register);

// Email Verification Route
router.get("/verify/:token", verifyEmail);

// Admin Login Route
router.post("/admin-login", adminLogin);

// Check Auth User
router.get("/check", verifyToken, checkAuth);

// Logout
router.post("/logout", logout);

export default router;
