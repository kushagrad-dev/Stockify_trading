const { Schema } = require("mongoose");

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    balance: {
      type: Number,
      default: 100000,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = {
  UserSchema,
};