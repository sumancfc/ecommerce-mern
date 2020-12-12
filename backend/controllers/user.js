const User = require("../models/user");

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
