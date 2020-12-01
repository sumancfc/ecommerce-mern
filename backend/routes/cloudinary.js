const express = require("express");

const router = express.Router();

const { authCheck, adminCheck } = require("../middlewares/auth");
const { uploadImage, deleteImage } = require("../controllers/cloudinary");

router.post("/uploadimages", authCheck, adminCheck, uploadImage);
router.post("/deleteimages", authCheck, adminCheck, deleteImage);

module.exports = router;
