const express = require("express");
const { userCreateOrUpdate, currentUser } = require("../controllers/auth");
const { authCheck } = require("../middlewares/auth");

const router = express.Router();

router.post("/create-update-user", authCheck, userCreateOrUpdate);
router.post("/current-user", authCheck, currentUser);

module.exports = router;
