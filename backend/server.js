const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const subCategoryRoutes = require("./routes/subcategory");
const productRoutes = require("./routes/product");
const couponRoutes = require("./routes/coupon");
const cloudinaryRoutes = require("./routes/cloudinary");

const { errorNotFound, errorHandler } = require("./middlewares/errorHandler");

//database connection
mongoose
  .connect(process.env.DATABASE_URL, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("Problems while connecting database", err);
  });

//middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());

//routes middleware
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", subCategoryRoutes);
app.use("/api", productRoutes);
app.use("/api", couponRoutes);
app.use("/api", cloudinaryRoutes);

//error middleware
app.use(errorNotFound);
app.use(errorHandler);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
