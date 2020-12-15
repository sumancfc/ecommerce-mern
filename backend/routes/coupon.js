const express = require("express");

const router = express.Router();

const { authCheck, adminCheck } = require("../middlewares/auth");
const {
  createCoupon,
  getAllCoupons,
  deleteCoupon,
} = require("../controllers/coupon");

router.post("/coupon", authCheck, adminCheck, createCoupon);
router.get("/coupons", authCheck, adminCheck, getAllCoupons);
router.delete("/coupon/:id", authCheck, adminCheck, deleteCoupon);

module.exports = router;
