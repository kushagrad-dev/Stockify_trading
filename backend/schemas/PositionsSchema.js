const { Schema } = require("mongoose");

const PositionsSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    product: {
      type: String,
      default: "CNC",
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    qty: {
      type: Number,
      required: true,
      min: 0,
    },

    avg: {
      type: Number,
      required: true,
      min: 0,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    net: {
      type: String,
      default: "0",
    },

    day: {
      type: String,
      default: "0%",
    },

    isLoss: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = {
  PositionsSchema,
};