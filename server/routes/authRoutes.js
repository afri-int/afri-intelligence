import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { getProfile } from "../controllers/authController.js";

const router = express.Router();

// Register route
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  const emailNormalized = email?.toLowerCase().trim();
  const passwordNormalized = password?.trim();

  if (!name || !emailNormalized || !passwordNormalized || !role) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const existingUser = await User.findOne({ email: emailNormalized });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(passwordNormalized, 10);

    const newUser = new User({
      name,
      email: emailNormalized,
      password: hashedPassword,
      role
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const emailNormalized = email?.toLowerCase().trim();
  const passwordNormalized = password?.trim();

  if (!emailNormalized || !passwordNormalized) {
    return res.status(400).json({ error: "All fields required" });
  }

  try {
    const user = await User.findOne({ email: emailNormalized });

    if (!user) {
      console.log("User not found for:", emailNormalized);
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(passwordNormalized, user.password);

    console.log("Password match:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1d" }
    );

    res.json({
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Profile route
router.get("/profile", getProfile);

export default router;
