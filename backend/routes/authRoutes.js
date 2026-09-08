const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/User");

const router = express.Router();

const createToken = (user) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is missing from environment variables");
  }

  return jwt.sign(
    {
      userId: user._id.toString(),
      email: user.email,
    },
    secret,
    {
      expiresIn: "7d",
    }
  );
};

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

    const userPassword = String(password || "");

    if (!userName || !normalizedEmail || !userPassword) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    if (userPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const existingUser = await UserModel.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(
      userPassword,
      10
    );

    const user = await UserModel.create({
      name: userName,
      email: normalizedEmail,
      password: hashedPassword,
      balance: 100000,
    });

    const token = createToken(user);

    return res.status(201).json({
      success: true,
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

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists",
      });
    }

    return res.status(500).json({
      success: false,
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

    const normalizedEmail = String(email || "")
      .trim()
      .toLowerCase();

    const userPassword = String(password || "");

    if (!normalizedEmail || !userPassword) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await UserModel.findOne({
      email: normalizedEmail,
    }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const passwordMatch = await bcrypt.compare(
      userPassword,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = createToken(user);

    return res.status(200).json({
      success: true,
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
      success: false,
      message: "Server error during login",
    });
  }
});

// ======================================================
// LOGOUT
// ======================================================

router.post("/logout", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Logout successful",
  });
});

module.exports = router;