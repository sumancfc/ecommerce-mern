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

//get products by count
exports.getProductsByCount = async (req, res) => {
  const count = req.params.count;
  let products = await Product.find({})
    .limit(parseInt(count))
    .populate("category")
    .populate("subs")
    .sort([["createdAt", "desc"]])
    .exec();

  res.json(products);
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

//related products
exports.relatedProduct = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id).exec();

  const relatedProduct = await Product.find({
    _id: { $ne: product._id },
    category: product.category,
  })
    .limit(3)
    .populate("category")
    .populate("subs")
    .populate("user")
    .exec();

  res.json(relatedProduct);
};

//handle Query
const handleQuery = async (req, res, query) => {
  try {
    const products = await Product.find({ $text: { $search: query } })
      .populate("category", "_id name")
      .populate("subs", "_id name")
      .populate("user", "_id name")
      .exec();

    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

//handle price
const handlePriceQuery = async (req, res, price) => {
  try {
    const products = await Product.find({
      price: {
        $gte: price[0],
        $lte: price[1],
      },
    })
      .populate("category", "_id name")
      .populate("subs", "_id name")
      .populate("user", "_id name")
      .exec();

    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

//handle category
const handleCategoryQuery = async (req, res, category) => {
  try {
    const products = await Product.find({ category })
      .populate("category", "_id name")
      .populate("subs", "_id name")
      .populate("user", "_id name")
      .exec();

    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

//handle sub category
const handleSubQuery = async (req, res, sub) => {
  try {
    const products = await Product.find({ subs: sub })
      .populate("category", "_id name")
      .populate("subs", "_id name")
      .populate("user", "_id name")
      .exec();

    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

//handle product brand
const handleBrandQuery = async (req, res, brand) => {
  try {
    const products = await Product.find({ brand })
      .populate("category", "_id name")
      .populate("subs", "_id name")
      .populate("user", "_id name")
      .exec();

    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

//handle product shipping
const handleShippingQuery = async (req, res, shipping) => {
  try {
    const products = await Product.find({ shipping })
      .populate("category", "_id name")
      .populate("subs", "_id name")
      .populate("user", "_id name")
      .exec();

    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

//handle product brand
const handleColorQuery = async (req, res, color) => {
  try {
    const products = await Product.find({ color })
      .populate("category", "_id name")
      .populate("subs", "_id name")
      .populate("user", "_id name")
      .exec();

    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

//search products by query,price
exports.searchProducts = async (req, res) => {
  const { query, price, category, sub, shipping, color, brand } = req.body;

  if (query) {
    await handleQuery(req, res, query);
  }

  if (price !== undefined) {
    await handlePriceQuery(req, res, price);
  }

  if (category) {
    await handleCategoryQuery(req, res, category);
  }

  if (sub) {
    await handleSubQuery(req, res, sub);
  }

  if (brand) {
    await handleBrandQuery(req, res, brand);
  }

  if (shipping) {
    await handleShippingQuery(req, res, shipping);
  }

  if (color) {
    await handleColorQuery(req, res, color);
  }
};
