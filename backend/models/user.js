const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      index: true,
      required: true,
    },
    role: {
      type: String,
      default: "subscriber",
    },
    cart: {
      type: Array,
      default: [],
    },
    address: String,
    //   wishlist: {
    //          type:
    //   }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
