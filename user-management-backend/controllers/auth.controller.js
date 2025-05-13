import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import {
  registerUser,
  findUserByEmail,
  verifyUserEmail,
} from "../models/user.model.js";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Register User
export const register = (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  if (!["customer", "admin"].includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  findUserByEmail(email, (err, users) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (users.length > 0)
      return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = bcrypt.hashSync(password, 10);
    const verificationToken = Math.random().toString(36).substring(2, 15);

    const newUser = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      verificationToken,
    };

    registerUser(newUser, (err) => {
      if (err) return res.status(500).json({ message: "Registration failed" });

      const verificationUrl = `${process.env.BASE_URL}/api/auth/verify/${verificationToken}`;

      transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Email Verification",
        html: `<p>Click <a href="${verificationUrl}">here</a> to verify your email.</p>`,
      });

      res
        .status(201)
        .json({ message: "User registered. Check email for verification." });
    });
  });
};

// Email verification
export const verifyEmail = (req, res) => {
  const { token } = req.params;

  verifyUserEmail(token, (err, result) => {
    if (err) return res.status(500).json({ message: "Verification failed" });

    if (result.affectedRows === 0) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    res.status(200).json({ message: "Email successfully verified" });
  });
};

// Admin Login
export const adminLogin = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  findUserByEmail(email, (err, users) => {
    if (err) return res.status(500).json({ message: "Database error." });

    if (users.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    const user = users[0];

    // Check if the user is an admin
    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "You are not allowed to login from here." });
    }

    // Compare the password
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password." });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Set the token in a cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 60 * 60 * 1000,
    });

    return res.json({
      message: "Login successful.",
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        role: user.role,
        email_verified: user.email_verified,
      },
    });
  });
};

export const checkAuth = (req, res) => {
  const { id, first_name, last_name, email, role, email_verified } = req.user;
  res.status(200).json({
    id,
    firstName: first_name,
    lastName: last_name,
    email,
    role,
    email_verified,
  });
};

// Logout
export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
  });

  res.json({ message: "Logout successful" });
};
