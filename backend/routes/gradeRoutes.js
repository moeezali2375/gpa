const {
  getGrades,
  updateGrades,
  restoreGrades,
} = require("../controllers/gradeControllers");

const protect = require("../middlewares/authMiddleware");
const verify = require("../middlewares/verifyMiddleware");
const router = require("express").Router();

router.get("/", protect, verify, getGrades);

router.put("/", protect, verify, updateGrades);

router.put("/restore", protect, verify, restoreGrades);

module.exports = router;
