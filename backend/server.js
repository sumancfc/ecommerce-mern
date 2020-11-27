const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
