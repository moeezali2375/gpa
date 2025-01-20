const express = require("express");
const { getGPA } = require("../controllers/stalkControllers");
const protect = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", protect, getGPA);

module.exports = router;
