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
  reviewProduct,
  relatedProduct,
  searchProducts,
  getProductsByCount,
} = require("../controllers/product");

router.post("/product", authCheck, adminCheck, createProduct);
router.get("/products", getAllProducts);
router.get("/products/:count", getProductsByCount);
router.get("/product/:slug", getSingleProduct);
router.put("/product/:slug", authCheck, adminCheck, updateProduct);
router.delete("/product/:slug", authCheck, adminCheck, deleteProduct);
router.put("/product/:id/review", authCheck, reviewProduct);
//product by select
router.post("/products", productBySelect);
//related product
router.get("/product/:id/related", relatedProduct);
//search product
router.post("/search/filters", searchProducts);

module.exports = router;
