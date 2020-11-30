const Subcategory = require("../models/subCategory");
const Product = require("../models/category");
const slugify = require("slugify");

//create sub category
exports.createSubcategory = async (req, res) => {
  try {
    const { name, parent } = req.body;

    if (!parent) {
      res.status(400).json({ message: "Parent Category not selected" });
    }

    const subCategoryExits = await Subcategory.findOne({ name });

    if (subCategoryExits) {
      res.status(409).json({ message: "Sub Category already exits." });
    } else {
      const subCategory = await new Subcategory({
        name,
        parent,
        slug: slugify(name),
      }).save();
      res.json(subCategory);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Failed to create sub category." });
  }
};

//get all sub categories
exports.getAllSubcategory = async (req, res) => {
  const subCategories = await Subcategory.find({})
    .sort({ createdAt: -1 })
    .exec();

  res.json(subCategories);
};

//get single sub category
exports.getSingleSubcategory = async (req, res) => {
  const slug = req.params.slug;

  const subCategory = await Subcategory.findOne({ slug }).exec();

  // const products = await Product.find({ subs: slug })
  //   .populate("category")
  //   .exec();

  res.json(subCategory);
  // res.json({ subCategory, products });
};

// update sub category
exports.updateSubcategory = async (req, res) => {
  const { name, parent } = req.body;

  try {
    const slug = req.params.slug;

    const subCategory = await Subcategory.findOneAndUpdate(
      { slug },
      { name, slug: slugify(name), parent },
      { new: true }
    );

    res.json(subCategory);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Sub Category failed to update." });
  }
};

//delete sub category
exports.deleteSubcategory = async (req, res) => {
  try {
    const slug = req.params.slug;

    const subCategory = await Subcategory.findOneAndDelete({ slug });

    if (!subCategory) {
      res.status(400).json({
        message: "Sub Category not found or already have been deleted!",
      });
    }

    res.json({ message: "Sub Category deleted" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Sub Category failed to delete." });
  }
};
