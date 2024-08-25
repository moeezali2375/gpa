const mongoose = require("mongoose");
const CourseSchema = require("./courseModel");
const semesterSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
  },
  desc: {
    type: String,
  },
  courses: [CourseSchema],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Semester = mongoose.model("Semester", semesterSchema);
module.exports = Semester;
