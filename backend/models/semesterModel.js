const mongoose = require("mongoose");
const CourseSchema = require("./courseModel");
const semesterSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
  },
  season: {
    type: Number,
    required: true,
    enum: [1, 2, 3, 4],
  },
  year: {
    type: Number,
    required: true,
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
