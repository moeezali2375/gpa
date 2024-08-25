const {
  getSemesters,
  addSemester,
  deleteSemester,
  updateSemester,
  updateSemesterCourses,
} = require("../controllers/semesterControllers");
const protect = require("../middlewares/authMiddleware");
const verify = require("../middlewares/verifyMiddleware");

const router = require("express").Router();

router.get("/", protect, verify, getSemesters);

router.post("/", protect, verify, addSemester);

router.delete("/:semesterId", protect, verify, deleteSemester);

router.put("/:semesterId", protect, verify, updateSemester);

router.put("/:semesterId/course", protect, verify, updateSemesterCourses);

module.exports = router;
