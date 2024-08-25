const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  credits: { type: Number, required: true },
  grade: { type: String, required: true },
});

module.exports = CourseSchema;
