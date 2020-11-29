const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

const authRoutes = require("./routes/auth");
const categoryRoutes = require("./routes/category");
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
app.use("/api", categoryRoutes);

//error middleware
app.use(errorNotFound);
app.use(errorHandler);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
