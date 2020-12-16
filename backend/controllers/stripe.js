const User = require("../models/user");
const Cart = require("../models/cart");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.stripePaymentIntent = async (req, res) => {
  const { couponApplied } = req.body;
  const { email } = req.user;

  const user = await User.findOne({ email }).exec();

  const { cartTotal, totalAfterDiscount } = await Cart.findOne({
    orderdBy: user._id,
  }).exec();

  let finalAmount = 0;

  if (couponApplied && totalAfterDiscount) {
    finalAmount = totalAfterDiscount * 100;
  } else {
    finalAmount = cartTotal * 100;
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: finalAmount,
    currency: "usd",
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
    cartTotal,
    totalAfterDiscount,
    payable: finalAmount,
  });
};
