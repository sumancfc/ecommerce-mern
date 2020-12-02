const Product = require("../models/product");
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
