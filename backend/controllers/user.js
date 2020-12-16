const User = require("../models/user");
const Cart = require("../models/cart");
const Product = require("../models/product");
const Coupon = require("../models/coupon");

//add to cart
exports.addUserCart = async (req, res) => {
  const { cartItems } = req.body;

  let products = [];

  const user = await User.findOne({ email: req.user.email }).exec();

  // check if cart with logged in user id already exist
  let cartExistByThisUser = await Cart.findOne({ orderdBy: user._id }).exec();

  if (cartExistByThisUser) {
    cartExistByThisUser.remove();
    console.log("removed old cart");
  }

  for (let i = 0; i < cartItems.length; i++) {
    let object = {};

    object.product = cartItems[i]._id;
    object.count = cartItems[i].qty;
    object.color = cartItems[i].color;
    // get price for creating total
    let productPrice = await Product.findById(cartItems[i]._id)
      .select("price")
      .exec();
    object.price = productPrice.price;

    products.push(object);
  }

  let cartTotal = 0;
  for (let i = 0; i < products.length; i++) {
    cartTotal = cartTotal + products[i].price * products[i].count;
  }

  const userCart = await new Cart({
    products,
    cartTotal,
    orderdBy: user._id,
  }).save();

  res.json({ ok: true });
};

//get cart
exports.getUserCart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();

  let cartItems = await Cart.findOne({ orderdBy: user._id })
    .populate("products.product", "_id title price totalAfterDiscount")
    .exec();

  const { products, cartTotal, totalAfterDiscount } = cartItems;

  res.json({ products, cartTotal, totalAfterDiscount });
};

//delete from cart
exports.deleteUserCart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();

  let cartItems = await Cart.findOneAndRemove({ orderdBy: user._id }).exec();

  res.json(cartItems);
};

//add to wishlist
exports.addToWishlist = async (req, res) => {
  const { productId } = req.body;
  const email = req.user.email;

  const wishlistItem = await User.findOneAndUpdate(
    { email },
    { $addToSet: { wishlist: productId } }
  ).exec();

  res.json(wishlistItem);
};

//get from wishlist
exports.getWishlist = async (req, res) => {
  const email = req.user.email;

  const wishlistItems = await User.findOne({ email })
    .select("wishlist")
    .populate("wishlist")
    .populate("product")
    .exec();

  res.json(wishlistItems);
};

//remove from wishlist
exports.removeFromWishlist = async (req, res) => {
  const { id } = req.params;
  const email = req.user.email;

  await User.findOneAndUpdate({ email }, { $pull: { wishlist: id } }).exec();

  res.json({
    message: "Product removed from wishlist",
  });
};

//apply coupon discount
exports.applyCoupon = async (req, res) => {
  const { couponName } = req.body;
  const { email } = req.user;

  const couponValidation = await Coupon.findOne({ name: couponName }).exec();

  if (couponValidation === null) {
    return res.json({
      err: "Invalid Coupon Applied",
    });
  }

  const user = await User.findOne({ email }).exec();

  const { products, cartTotal } = await Cart.findOne({ orderdBy: user._id })
    .populate("products.product", "_id title price")
    .exec();

  const discountPrice = ((cartTotal * couponValidation.discount) / 100).toFixed(
    2
  );

  const priceAfterDiscount = (
    cartTotal -
    (cartTotal * couponValidation.discount) / 100
  ).toFixed(2);

  Cart.findOneAndUpdate(
    { orderdBy: user._id },
    { totalAfterDiscount: priceAfterDiscount },
    { new: true }
  ).exec();

  res.json({ priceAfterDiscount, discountPrice });
};

//save address
exports.saveShippingAddress = async (req, res) => {
  const { shippingAddress } = req.body;
  const userAddress = await User.findOneAndUpdate(
    { email: req.user.email },
    { shippingAddress }
  ).exec();

  res.json({ ok: true });
};

//get address
exports.getShippingAddress = async (req, res) => {
  const userAddress = await User.findOne({ email: req.user.email })
    .select("shippingAddress")
    .exec();

  res.json(userAddress);
};
