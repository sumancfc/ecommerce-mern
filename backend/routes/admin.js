const express = require("express");
const router = express.Router();

const { authCheck, adminCheck } = require("../middlewares/auth");
const {
  getOrders,
  getOrderDetailsByAdmin,
  updateOrderStatus,
} = require("../controllers/admin");

router.get("/admin/orders", authCheck, adminCheck, getOrders);
router.get(
  "/admin/order/:orderId",
  authCheck,
  adminCheck,
  getOrderDetailsByAdmin
);
router.put("/admin/order-status", authCheck, adminCheck, updateOrderStatus);

module.exports = router;
