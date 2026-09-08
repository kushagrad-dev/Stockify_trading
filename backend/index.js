const path = require("path");

require("dotenv").config({
  path: path.join(__dirname, "../.env"),
});

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { UserModel } = require("./models/User");
const { HoldingsModel } = require("./models/HoldingsModel");
const { OrdersModel } = require("./models/OrdersModel");
const { PositionsModel } = require("./models/PositionsModel");

const authRoutes = require("./routes/authRoutes");

const app = express();

const PORT = process.env.PORT || 3008;
const MONGO_URL = process.env.MONGO_URL;
const JWT_SECRET = process.env.JWT_SECRET;

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",

  "http://10.137.184.93:3000",
  "http://10.137.184.93:3001",
  "http://10.137.184.93:3002",

  "https://stockifyy-frontend.netlify.app",
  "https://stockify-dashboard.netlify.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("Blocked CORS origin:", origin);

      return callback(new Error("Not allowed by CORS"));
    },

    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],

    credentials: false,

    optionsSuccessStatus: 204,
  })
);

// ======================================================
// BODY PARSERS
// ======================================================

app.use(
  express.json({
    limit: "10kb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
  })
);

// ======================================================
// JWT AUTHENTICATION MIDDLEWARE
// ======================================================

const requireAuthentication = (req, res, next) => {
  const authorization =
    req.headers.authorization || "";

  if (!authorization.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Authentication is required",
    });
  }

  const token = authorization.slice(7).trim();

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Authentication token missing",
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      JWT_SECRET
    );

    req.auth = decoded;

    return next();
  } catch (error) {
    console.error(
      "JWT verification error:",
      error.message
    );

    return res.status(401).json({
      success: false,
      message:
        "Your session is invalid or has expired",
    });
  }
};

// ======================================================
// AUTH ROUTES
// ======================================================

app.use("/auth", authRoutes);

// ======================================================
// BASIC ROUTE
// ======================================================

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Stockify backend is running",
  });
});

// ======================================================
// DIRECT SIGNUP
// ======================================================

app.post("/signup", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message:
          "Name, email and password are required.",
      });
    }

    const normalizedEmail =
      email.toLowerCase().trim();

    const existingUser =
      await UserModel.findOne({
        email: normalizedEmail,
      });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists.",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      balance: 100000,
    });

    if (!JWT_SECRET) {
      console.error(
        "JWT_SECRET is missing from environment variables"
      );

      return res.status(500).json({
        success: false,
        message: "Server configuration error",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id.toString(),
        email: user.email,
      },
      JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(201).json({
      success: true,
      message: "Signup successful.",
      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        balance: user.balance,
      },
    });
  } catch (error) {
    console.error(
      "Signup error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to create account.",
    });
  }
});

// ======================================================
// DIRECT LOGIN
// ======================================================

app.post("/login", async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message:
          "Email and password are required.",
      });
    }

    const normalizedEmail =
      email.toLowerCase().trim();

    const user =
      await UserModel.findOne({
        email: normalizedEmail,
      }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid email or password.",
      });
    }

    const isPasswordCorrect =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid email or password.",
      });
    }

    if (!JWT_SECRET) {
      console.error(
        "JWT_SECRET is missing from environment variables"
      );

      return res.status(500).json({
        success: false,
        message:
          "Server configuration error",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id.toString(),
        email: user.email,
      },
      JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        balance: user.balance,
      },
    });
  } catch (error) {
    console.error(
      "Login error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to login.",
    });
  }
});

// ======================================================
// GET ALL POSITIONS
// ======================================================

app.get(
  "/allpositions",
  requireAuthentication,
  async (req, res) => {
    try {
      const positions =
        await PositionsModel.find({
          userId: req.auth.userId,
          qty: { $gt: 0 },
        }).sort({
          _id: -1,
        });

      return res.status(200).json({
        success: true,
        data: positions,
      });
    } catch (error) {
      console.error(
        "Error fetching positions:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to fetch positions",
        error: error.message,
      });
    }
  }
);

// ======================================================
// GET ORDERS
// ======================================================

app.get(
  "/orders",
  requireAuthentication,
  async (req, res) => {
    try {
      const orders =
        await OrdersModel.find({
          userId: req.auth.userId,
        }).sort({
          _id: -1,
        });

      return res.status(200).json({
        success: true,
        data: orders,
      });
    } catch (error) {
      console.error(
        "Error fetching orders:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to fetch orders",
        error: error.message,
      });
    }
  }
);

// ======================================================
// GET ALL HOLDINGS
// ======================================================

app.get(
  "/allholdings",
  requireAuthentication,
  async (req, res) => {
    try {
      const holdings =
        await HoldingsModel.find({
          userId: req.auth.userId,
          qty: { $gt: 0 },
        }).sort({
          _id: -1,
        });

      return res.status(200).json({
        success: true,
        data: holdings,
      });
    } catch (error) {
      console.error(
        "Error fetching holdings:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to fetch holdings",
        error: error.message,
      });
    }
  }
);

// ======================================================
// ADD BUY ORDER
// ======================================================

app.post(
  "/addOrders",
  requireAuthentication,
  async (req, res) => {
    const {
      name,
      qty,
      price,
      mode,
    } = req.body;

    const quantity = Number(qty);
    const orderPrice = Number(price);

    if (
      !name ||
      !String(name).trim()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Stock name is required",
      });
    }

    if (
      !Number.isInteger(quantity) ||
      quantity <= 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Quantity must be a positive whole number",
      });
    }

    if (
      !Number.isFinite(orderPrice) ||
      orderPrice <= 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "A valid stock price is required",
      });
    }

    try {
      const stockName =
        String(name)
          .trim()
          .toUpperCase();

      const user =
        await UserModel.findById(
          req.auth.userId
        );

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      const totalOrderValue =
        quantity * orderPrice;

      if (
        user.balance < totalOrderValue
      ) {
        return res.status(400).json({
          success: false,
          message:
            `Insufficient funds. Available balance: ₹${user.balance.toLocaleString("en-IN")}`,
        });
      }

      // ==================================================
      // CREATE ORDER
      // ==================================================

      const newOrder =
        new OrdersModel({
          userId:
            req.auth.userId,

          name:
            stockName,

          qty:
            quantity,

          price:
            orderPrice,

          mode:
            mode || "BUY",
        });

      const savedOrder =
        await newOrder.save();

      console.log(
        "BUY ORDER CREATED:",
        {
          userId:
            req.auth.userId,

          stockName,

          quantity,

          orderPrice,
        }
      );

      // ==================================================
      // FIND EXISTING HOLDING
      // ==================================================

      let holding =
        await HoldingsModel.findOne({
          userId:
            req.auth.userId,

          name: new RegExp(
            `^${stockName}$`,
            "i"
          ),
        });

      // ==================================================
      // CREATE / UPDATE HOLDING
      // ==================================================

      if (!holding) {
        holding =
          new HoldingsModel({
            userId:
              req.auth.userId,

            name:
              stockName,

            qty:
              quantity,

            avg:
              orderPrice,

            price:
              orderPrice,

            net:
              "0",

            day:
              "0%",
          });
      } else {
        const oldQty =
          Number(holding.qty) || 0;

        const oldAvg =
          Number(holding.avg) || 0;

        const totalCost =
          oldQty * oldAvg +
          quantity * orderPrice;

        const totalQty =
          oldQty + quantity;

        const newAverage =
          totalQty > 0
            ? totalCost / totalQty
            : orderPrice;

        holding.qty =
          totalQty;

        holding.avg =
          newAverage;

        holding.price =
          orderPrice;

        holding.net =
          "0";

        holding.day =
          "0%";
      }

      await holding.save();

      // ==================================================
      // CREATE / UPDATE POSITION
      // ==================================================

      let position =
        await PositionsModel.findOne({
          userId:
            req.auth.userId,

          name: new RegExp(
            `^${stockName}$`,
            "i"
          ),
        });

      if (!position) {
        position =
          new PositionsModel({
            userId:
              req.auth.userId,

            product:
              "CNC",

            name:
              stockName,

            qty:
              quantity,

            avg:
              orderPrice,

            price:
              orderPrice,

            net:
              "0",

            day:
              "0%",

            isLoss:
              false,
          });
      } else {
        const oldQty =
          Number(position.qty) || 0;

        const oldAvg =
          Number(position.avg) || 0;

        const totalCost =
          oldQty * oldAvg +
          quantity * orderPrice;

        const totalQty =
          oldQty + quantity;

        const newAverage =
          totalQty > 0
            ? totalCost / totalQty
            : orderPrice;

        position.qty =
          totalQty;

        position.avg =
          newAverage;

        position.price =
          orderPrice;

        position.net =
          "0";

        position.day =
          "0%";

        position.isLoss =
          false;
      }

      await position.save();

      // ==================================================
      // DEDUCT PURCHASE AMOUNT FROM USER BALANCE
      // ==================================================

      user.balance -=
        totalOrderValue;

      await user.save();

      // ==================================================
      // SUCCESS
      // ==================================================

      return res.status(201).json({
        success: true,

        message:
          "Order placed successfully",

        data: {
          order:
            savedOrder,

          holding:
            holding,

          position:
            position,

          balance:
            user.balance,
        },
      });

    } catch (error) {
      console.error(
        "Error adding order:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to add order",
        error: error.message,
      });
    }
  }
);

// ======================================================
// SELL ORDER
// ======================================================

app.post(
  "/sellOrder",
  requireAuthentication,
  async (req, res) => {
    const {
      name,
      qty,
      price,
    } = req.body;

    try {
      if (
        typeof name !== "string" ||
        !name.trim()
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Stock name is required",
        });
      }

      const quantity =
        Number(qty);

      const sellPrice =
        Number(price);

      if (
        !Number.isInteger(quantity) ||
        quantity <= 0
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Quantity must be a positive whole number",
        });
      }

      if (
        !Number.isFinite(sellPrice) ||
        sellPrice <= 0
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Price must be greater than 0",
        });
      }

      const stockName =
        name
          .trim()
          .toUpperCase();

      const user =
        await UserModel.findById(
          req.auth.userId
        );

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      // ==================================================
      // FIND HOLDING
      // ==================================================

      const holding =
        await HoldingsModel.findOne({
          userId:
            req.auth.userId,

          name: new RegExp(
            `^${stockName}$`,
            "i"
          ),
        });

      if (!holding) {
        return res.status(404).json({
          success: false,
          message:
            `You do not own any ${stockName} shares`,
        });
      }

      // ==================================================
      // CHECK QUANTITY
      // ==================================================

      const ownedQuantity =
        Number(holding.qty) || 0;

      if (
        quantity > ownedQuantity
      ) {
        return res.status(400).json({
          success: false,

          message:
            `You only own ${ownedQuantity} share${
              ownedQuantity === 1
                ? ""
                : "s"
            } of ${stockName}`,
        });
      }

      // ==================================================
      // FIND POSITION
      // ==================================================

      const position =
        await PositionsModel.findOne({
          userId:
            req.auth.userId,

          name: new RegExp(
            `^${stockName}$`,
            "i"
          ),
        });

      // ==================================================
      // CREATE SELL ORDER
      // ==================================================

      const newOrder =
        new OrdersModel({
          userId:
            req.auth.userId,

          name:
            stockName,

          qty:
            quantity,

          price:
            sellPrice,

          mode:
            "SELL",
        });

      const savedOrder =
        await newOrder.save();

      // ==================================================
      // CALCULATE REMAINING QUANTITY
      // ==================================================

      const remainingQuantity =
        ownedQuantity - quantity;

      // ==================================================
      // REMOVE / UPDATE HOLDING
      // ==================================================

      if (
        remainingQuantity === 0
      ) {
        await HoldingsModel.deleteOne({
          _id:
            holding._id,
        });
      } else {
        holding.qty =
          remainingQuantity;

        holding.price =
          sellPrice;

        holding.day =
          "0%";

        holding.net =
          "0";

        await holding.save();
      }

      // ==================================================
      // REMOVE / UPDATE POSITION
      // ==================================================

      if (position) {
        if (
          remainingQuantity === 0
        ) {
          await PositionsModel.deleteOne({
            _id:
              position._id,
          });
        } else {
          position.qty =
            remainingQuantity;

          position.price =
            sellPrice;

          position.day =
            "0%";

          position.net =
            "0";

          await position.save();
        }
      }

      // ==================================================
      // ADD SALE PROCEEDS BACK TO USER BALANCE
      // ==================================================

      const totalSellValue =
        quantity * sellPrice;

      user.balance +=
        totalSellValue;

      await user.save();

      // ==================================================
      // SUCCESS
      // ==================================================

      return res.status(200).json({
        success: true,

        message:
          `${quantity} share${
            quantity === 1
              ? ""
              : "s"
          } of ${stockName} sold successfully`,

        data: {
          order:
            savedOrder,

          remainingQuantity,

          balance:
            user.balance,
        },
      });

    } catch (error) {
      console.error(
        "Error selling stock:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to sell stock",
        error: error.message,
      });
    }
  }
);

// ======================================================
// GET CURRENT USER
// ======================================================

app.get(
  "/me",
  requireAuthentication,
  async (req, res) => {
    try {
      const user =
        await UserModel.findById(
          req.auth.userId
        ).select("-password");

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      return res.status(200).json({
        success: true,

        user: {
          id:
            user._id,

          name:
            user.name,

          email:
            user.email,

          balance:
            user.balance,
        },
      });
    } catch (error) {
      console.error(
        "Error fetching user:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to fetch user",
      });
    }
  }
);

// ======================================================
// GLOBAL ERROR HANDLER
// ======================================================

app.use(
  (error, req, res, next) => {
    console.error(
      "Server error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Internal server error",
    });
  }
);

// ======================================================
// START SERVER
// ======================================================

const startServer = async () => {
  try {
    // -----------------------------------------------
    // CHECK MONGO URL
    // -----------------------------------------------

    if (!MONGO_URL) {
      console.error(
        "MONGO_URL is missing in .env"
      );

      process.exit(1);
    }

    // -----------------------------------------------
    // CHECK JWT SECRET
    // -----------------------------------------------

    if (!JWT_SECRET) {
      console.error(
        "JWT_SECRET is missing in .env"
      );

      process.exit(1);
    }

    // -----------------------------------------------
    // CONNECT MONGODB
    // -----------------------------------------------

    await mongoose.connect(
      MONGO_URL
    );

    console.log(
      "MongoDB connected successfully"
    );

    // -----------------------------------------------
    // START SERVER
    // -----------------------------------------------

    app.listen(
      PORT,
      "0.0.0.0",
      () => {
        console.log(
          `Stockify backend running on http://10.137.184.93:${PORT}`
        );
      }
    );

  } catch (error) {
    console.error(
      "MongoDB connection failed:"
    );

    console.error(
      error.message
    );

    process.exit(1);
  }
};

// ======================================================
// START
// ======================================================

startServer();