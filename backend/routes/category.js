const express = require("express");

const router = express.Router();

const { authCheck, adminCheck } = require("../middlewares/auth");
const {
  createCategory,
  getAllCategory,
  getSingleCategory,
  updateCategory,
  deleteCategory,
  getSubCategories,
} = require("../controllers/category");

router.post("/category", authCheck, adminCheck, createCategory);
router.get("/categories", getAllCategory);
router.get("/category/:slug", getSingleCategory);
router.put("/category/:slug", authCheck, adminCheck, updateCategory);
router.delete("/category/:slug", authCheck, adminCheck, deleteCategory);
router.get("/category/subs/:_id", getSubCategories);

module.exports = router;
