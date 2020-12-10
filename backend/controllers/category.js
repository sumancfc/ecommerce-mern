const Category = require("../models/category");
const Product = require("../models/product");
const Subcategory = require("../models/subCategory");
const slugify = require("slugify");

//create category
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const categoryExits = await Category.findOne({ name });

    if (categoryExits) {
      res.status(409).json({ message: "Category already present" });
      return;
    } else {
      const category = await new Category({ name, slug: slugify(name) }).save();

      res.json(category);
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed to create category!" });
  }
};

//get all categories
exports.getAllCategory = async (req, res) => {
  const categories = await Category.find({}).sort({ createdAt: -1 }).exec();
  res.json(categories);
};

//get single category
exports.getSingleCategory = async (req, res) => {
  const slug = req.params.slug;

  const category = await Category.findOne({ slug }).exec();

  const products = await Product.find({ category })
    .sort({ createdAt: -1 })
    .populate("category")
    .exec();

  res.json({ category, products });
  // res.json(category);
};

//update category
exports.updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const slug = req.params.slug;

    const category = await Category.findOneAndUpdate(
      { slug },
      { name, slug: slugify(name) },
      { new: true }
    );

    res.json(category);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Category failed to update." });
  }
};

//delete category
exports.deleteCategory = async (req, res) => {
  try {
    const slug = req.params.slug;

    const category = await Category.findOneAndDelete({ slug });

    if (!category) {
      res
        .status(400)
        .json({ message: "Category not found or already have been deleted!" });
    }

    res.json({ message: "Category Deleted" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Category failed to delete." });
  }
};

//get sub categories
exports.getSubCategories = (req, res) => {
  Subcategory.find({ parent: req.params._id }).exec((err, subs) => {
    if (err) console.log(err);
    res.json(subs);
  });
};
