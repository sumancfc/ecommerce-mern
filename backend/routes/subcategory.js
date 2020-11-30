const express = require("express");

const router = express.Router();

const { authCheck, adminCheck } = require("../middlewares/auth");

const {
  createSubcategory,
  getAllSubcategory,
  getSingleSubcategory,
  updateSubcategory,
  deleteSubcategory,
} = require("../controllers/subcategory");

router.post("/subcategory", authCheck, adminCheck, createSubcategory);
router.get("/subcategories", getAllSubcategory);
router.get("/subcategory/:slug", getSingleSubcategory);
router.put("/subcategory:slug", authCheck, adminCheck, updateSubcategory);
router.delete("/subcategory:slug", authCheck, adminCheck, deleteSubcategory);

module.exports = router;
