const express = require("express");

const {
  addUserCart,
  getUserCart,
  deleteUserCart,
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

//wishlist
router.post("/user/wishlist", authCheck, addToWishlist);
router.get("/user/wishlist", authCheck, getWishlist);
router.put("/user/wishlist/:id", authCheck, removeFromWishlist);

module.exports = router;
