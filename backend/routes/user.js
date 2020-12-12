const express = require("express");
const {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} = require("../controllers/user");
const { authCheck } = require("../middlewares/auth");

const router = express.Router();

//wishlist
router.post("/user/wishlist", authCheck, addToWishlist);
router.get("/user/wishlist", authCheck, getWishlist);
router.put("/user/wishlist/:id", authCheck, removeFromWishlist);

module.exports = router;
