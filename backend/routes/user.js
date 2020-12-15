const express = require("express");

const {
  addUserCart,
  getUserCart,
  deleteUserCart,
  saveShippingAddress,
  applyCoupon,
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} = require("../controllers/user");

const { authCheck } = require("../middlewares/auth");

const router = express.Router();

//cart
router.post("/user/cart", authCheck, addUserCart);
router.get("/user/cart", authCheck, getUserCart);
router.delete("/user/cart", authCheck, deleteUserCart);

//shipping address
router.post("/user/address", authCheck, saveShippingAddress);

//coupon
router.post("/user/cart/coupon", authCheck, applyCoupon);

//wishlist
router.post("/user/wishlist", authCheck, addToWishlist);
router.get("/user/wishlist", authCheck, getWishlist);
router.put("/user/wishlist/:id", authCheck, removeFromWishlist);

module.exports = router;
