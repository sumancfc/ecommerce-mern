const express = require("express");

const { stripePaymentIntent } = require("../controllers/stripe");

const { authCheck } = require("../middlewares/auth");

const router = express.Router();

router.post("/create-stripe-payment", authCheck, stripePaymentIntent);

module.exports = router;
