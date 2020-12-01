const express = require("express");

const router = express.Router();

const { authCheck, adminCheck } = require("../middlewares/auth");
const { createProduct } = require("../controllers/product");

router.post("/product", authCheck, adminCheck, createProduct);

module.exports = router;
