const mongoose = require("mongoose");

const gradeSchema = new mongoose.Schema({
  grades: {
    type: Map,
    of: {
      type: Number,
      set: (val) => Math.round(val * 100) / 100,
    },
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Grade = mongoose.model("Grade", gradeSchema);

module.exports = Grade;
