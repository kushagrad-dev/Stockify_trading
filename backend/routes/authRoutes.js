const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/User");

const router = express.Router();

// ======================================================
// SIGN UP
// ======================================================

router.post("/signup", async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    const userName = String(name || username || "").trim();
    const normalizedEmail = String(email || "")
      .trim()
      .toLowerCase();

    if (!userName || !normalizedEmail || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    const existingUser = await UserModel.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        message: "An account with this email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      name: userName,
      email: normalizedEmail,
      password: hashedPassword,

      // New Stockify account starts with ₹1,00,000
      balance: 100000,
    });

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      console.error("JWT_SECRET is missing from environment variables");

      return res.status(500).json({
        message: "Server configuration error",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id.toString(),
        email: user.email,
      },
      secret,
      {
        expiresIn: "7d",
      }
    );

    return res.status(201).json({
      message: "Account created successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        balance: user.balance,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);

    return res.status(500).json({
      message: "Server error during signup",
    });
  }
});

// ======================================================
// LOGIN
// ======================================================

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Password is select:false in UserSchema,
    // so explicitly request it for authentication.
    const user = await UserModel.findOne({
      email: normalizedEmail,
    }).select("+password");

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      console.error("JWT_SECRET is missing from environment variables");

      return res.status(500).json({
        message: "Server configuration error",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id.toString(),
        email: user.email,
      },
      secret,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        balance: user.balance,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      message: "Server error during login",
    });
  }
});

// ======================================================
// LOGOUT
// ======================================================

router.post("/logout", (req, res) => {
  return res.status(200).json({
    message: "Logout successful",
  });
});

module.exports = router;