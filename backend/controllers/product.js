const Product = require("../models/product");
const User = require("../models/user");
const slugify = require("slugify");

//create products
exports.createProduct = async (req, res) => {
  try {
    console.log(req.body);
    req.body.slug = slugify(req.body.title);

    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch (error) {
    console.log(error);
    res.status(400).json({ err: error.message });
  }
};

//get all products
exports.getAllProducts = async (req, res) => {
  const products = await Product.find()
    .populate("category")
    .populate("subs")
    .sort([["createdAt", "desc"]])
    .exec();

  res.json(products);
};

//get single product
exports.getSingleProduct = async (req, res) => {
  const slug = req.params.slug;

  const product = await Product.findOne({ slug })
    .populate("category")
    .populate("subs")
    .exec();

  res.json(product);
};

//update product
exports.updateProduct = async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    ).exec();

    res.status(200).json(updatedProduct);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  }
};

//delete product
exports.deleteProduct = async (req, res) => {
  try {
    const slug = req.params.slug;
    await Product.findOneAndRemove({ slug }).exec();
    res.json({ message: "Category Deleted" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed to delete product" });
  }
};

//get products by arrival and sold
exports.productBySelect = async (req, res) => {
  try {
    const { sort, order, limit } = req.body;

    const products = await Product.find({})
      .populate("category")
      .populate("subs")
      .sort([[sort, order]])
      .limit(limit)
      .exec();

    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Failed to get products",
    });
  }
};

//add  product review
exports.reviewProduct = async (req, res) => {
  const product = await Product.findById(req.params.id).exec();
  const user = await User.findOne({ email: req.user.email }).exec();

  const { rating, comment } = req.body;

  //check if reviews exist
  let reviewExist = product.reviews.find(
    (rev) => rev.user.toString() === user._id.toString()
  );

  // if review not exist then add review
  if (reviewExist === undefined) {
    const review = {
      name: user.name,
      rating: Number(rating),
      comment,
      user: user._id,
    };

    product.reviews.push(review);

    product.reviewsNumber = product.reviews.length;

    const reviewSaved = await product.save();

    res.json(reviewSaved);
  } else {
    // if review already exist then update review
    const updateReview = await Product.updateOne(
      {
        reviews: { $elemMatch: reviewExist },
      },
      { $set: { "reviews.$.rating": rating, "reviews.$.comment": comment } },
      { new: true }
    ).exec();

    res.json(updateReview);
  }
};
