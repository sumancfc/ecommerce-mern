const express = require("express");

const router = express.Router();

const { authCheck, adminCheck } = require("../middlewares/auth");
const {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  productBySelect,
} = require("../controllers/product");

router.post("/product", authCheck, adminCheck, createProduct);
router.get("/products", getAllProducts);
router.get("/product/:slug", getSingleProduct);
router.put("/product/:slug", authCheck, adminCheck, updateProduct);
router.delete("/product/:slug", authCheck, adminCheck, deleteProduct);

router.post("/products", productBySelect);

module.exports = router;
