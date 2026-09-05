const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "../.env"),
});

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const { HoldingsModel } = require("./models/HoldingsModel");
const { OrdersModel } = require("./models/OrdersModel");
const { PositionsModel } = require("./models/PositionsModel");
const authRoutes = require("./routes/authRoutes");

const app = express();

const PORT = 3008;
const MONGO_URL = process.env.MONGO_URL;

/// ======================================================
// CORS
// ======================================================

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://10.98.206.93:3000",
  "http://10.98.206.93:3001",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests without an Origin header
      // (Postman, curl, server-to-server, etc.)
      if (!origin) {
        return callback(null, true);
      }

      // Allow our frontend and dashboard
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("Blocked CORS origin:", origin);

      // Don't crash the backend for unknown origins
      return callback(null, false);
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
// AUTH ROUTES
// ======================================================

app.use("/auth", authRoutes);

// ======================================================
// BASIC ROUTE
// ======================================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Stockify backend is running",
  });
});

// ======================================================
// AUTHENTICATION MIDDLEWARE
// ======================================================

const requireAuthentication = (req, res, next) => {
  const authorization = req.headers.authorization || "";

  const token = authorization.startsWith("Bearer ")
    ? authorization.slice(7)
    : null;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Authentication is required",
    });
  }

  try {
    req.auth = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    return next();
  } catch (error) {
    console.error("JWT verification error:", error);

    return res.status(401).json({
      success: false,
      message: "Your session is invalid or has expired",
    });
  }
};

// ======================================================
// ADD SAMPLE POSITIONS
// ======================================================

app.get("/addPositions", async (req, res) => {
  const tempPositions = [
    {
      product: "CNC",
      name: "EVEREADY",
      qty: 2,
      avg: 316.27,
      price: 1902.1,
      net: "+0.58%",
      day: "-1.94%",
      isLoss: true,
    },
    {
      product: "CNC",
      name: "HDFCBANK",
      qty: 2,
      avg: 1383.4,
      price: 727.2,
      net: "+10.04%",
      day: "-0.04%",
      isLoss: false,
    },
  ];

  try {
    const positions =
      await PositionsModel.insertMany(tempPositions);

    return res.status(201).json({
      success: true,
      message: "Positions added successfully",
      data: positions,
    });
  } catch (error) {
    console.error(
      "Error adding positions:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to add positions",
      error: error.message,
    });
  }
});

// ======================================================
// GET ALL POSITIONS
// ======================================================

app.get("/allpositions", async (req, res) => {
  try {
    const positions = await PositionsModel.find({});

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
      message: "Failed to fetch positions",
      error: error.message,
    });
  }
});

// ======================================================
// ADD BUY ORDER
// ======================================================

app.post("/addOrders", async (req, res) => {
  const {
    name,
    qty,
    price,
    mode,
  } = req.body;

  const quantity = Number(qty);
  const orderPrice = Number(price);

  if (!name || !String(name).trim()) {
    return res.status(400).json({
      success: false,
      message: "Stock name is required",
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
      message: "A valid stock price is required",
    });
  }

  try {
    const stockName = String(name).trim();

    const newOrder = new OrdersModel({
      name: stockName,
      qty: quantity,
      price: orderPrice,
      mode: mode || "BUY",
    });

    const savedOrder = await newOrder.save();

    return res.status(201).json({
      success: true,
      message: "Order added successfully",
      data: savedOrder,
    });
  } catch (error) {
    console.error(
      "Error adding order:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to add order",
      error: error.message,
    });
  }
});

// ======================================================
// SELL ORDER
// ======================================================

app.post("/sellOrder", async (req, res) => {
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
        message: "Stock name is required",
      });
    }

    const quantity = Number(qty);
    const sellPrice = Number(price);

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
        message: "Price must be greater than 0",
      });
    }

    const stockName = name
      .trim()
      .toUpperCase();

    const holding =
      await HoldingsModel.findOne({
        name: new RegExp(
          `^${stockName}$`,
          "i"
        ),
      });

    if (!holding) {
      return res.status(404).json({
        success: false,
        message: `You do not own any ${stockName} shares`,
      });
    }

    const ownedQuantity =
      Number(holding.qty) || 0;

    if (quantity > ownedQuantity) {
      return res.status(400).json({
        success: false,
        message: `You only own ${ownedQuantity} share${
          ownedQuantity === 1 ? "" : "s"
        } of ${stockName}`,
      });
    }

    const remainingQuantity =
      ownedQuantity - quantity;

    const newOrder = new OrdersModel({
      name: stockName,
      qty: quantity,
      price: sellPrice,
      mode: "SELL",
    });

    const savedOrder =
      await newOrder.save();

    if (remainingQuantity === 0) {
      await HoldingsModel.deleteOne({
        _id: holding._id,
      });
    } else {
      holding.qty = remainingQuantity;
      holding.price = sellPrice;

      await holding.save();
    }

    return res.status(200).json({
      success: true,
      message: `${quantity} share${
        quantity === 1 ? "" : "s"
      } of ${stockName} sold successfully`,
      data: {
        order: savedOrder,
        remainingQuantity,
      },
    });
  } catch (error) {
    console.error(
      "Error selling stock:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to sell stock",
      error: error.message,
    });
  }
});

// ======================================================
// FETCH ORDERS
// ======================================================

app.get("/orders", async (req, res) => {
  try {
    const orders =
      await OrdersModel.find({}).sort({
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
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
});

// ======================================================
// GET ALL HOLDINGS
// ======================================================

app.get("/allholdings", async (req, res) => {
  try {
    const holdings =
      await HoldingsModel.find({});

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
      message: "Failed to fetch holdings",
      error: error.message,
    });
  }
});

// ======================================================
// GLOBAL ERROR HANDLER
// ======================================================

app.use((error, req, res, next) => {
  console.error("Server error:", error);

  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

// ======================================================
// START SERVER
// ======================================================

const startServer = async () => {
  try {
    if (!MONGO_URL) {
      console.error(
        "MONGO_URL is missing in .env"
      );
      process.exit(1);
    }

    if (!process.env.JWT_SECRET) {
      console.error(
        "JWT_SECRET is missing in .env"
      );
      process.exit(1);
    }

    await mongoose.connect(MONGO_URL);

    console.log(
      "MongoDB connected successfully"
    );

    app.listen(
      PORT,
      "0.0.0.0",
      () => {
        console.log(
          `Stockify backend running on http://10.98.206.93:${PORT}`
        );
      }
    );
  } catch (error) {
    console.error(
      "MongoDB connection failed:"
    );

    console.error(error.message);

    process.exit(1);
  }
};

startServer();