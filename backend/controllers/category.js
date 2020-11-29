const Category = require("../models/category");
const slugify = require("slugify");
const { findOneAndDelete } = require("../models/category");

//create category
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const category = await new Category({ name, slug: slugify(name) }).save();

    res.json(category);
  } catch (err) {
    console.log(err);
    res.status(400).send("Failed to create category!");
  }
};

//get all categories
exports.getAllCategory = async (req, res) => {
  const categories = await Category.find({}).sort({ createdAt: -1 }).exec();
  res.json({
    count: categories.length,
    categories,
  });
};

//get single category
exports.getSingleCategory = async (req, res) => {
  const slug = req.params.slug;

  const category = await Category.findOne({ slug }).exec();

  if (!category) {
    res.status(400).json({ msg: "Category not found!" });
  }

  res.json(category);
};

//update category
exports.updateCategory = async (req, res) => {
  const { name } = req.body;

  try {
    const slug = req.params.slug;

    const category = await Category.findOneAndUpdate(
      { slug },
      { name, slug: slugify(name) },
      { new: true }
    );

    res.json(category);
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "Category failed to update." });
  }
};

//delete category
exports.deleteCategory = async (req, res) => {
  try {
    const slug = req.params.slug;

    const category = await Category.findOneAndDelete({ slug });

    if (!category) {
      res.json({ msg: "Category not found or already have been deleted!" });
    }

    res.json(category);
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "Category failed to delete." });
  }
};
