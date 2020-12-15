const Coupon = require("../models/coupon");

//create coupon
exports.createCoupon = async (req, res) => {
  try {
    const { name, expire, discount } = req.body.coupon;

    const coupon = await new Coupon({ name, expire, discount }).save();

    res.json(coupon);
  } catch (err) {
    console.log(err);
  }
};

//get all coupon
exports.getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find({}).sort({ createdAt: -1 }).exec();

    res.json(coupons);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed to create coupon!" });
  }
};

//delete coupon
exports.deleteCoupon = async (req, res) => {
  try {
    const { id } = req.params;

    const coupon = await Coupon.findByIdAndDelete(id).exec();

    res.json(coupon);
  } catch (err) {
    console.log(err);
  }
};
