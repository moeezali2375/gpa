const Grade = require("../models/gradeModel");

const gradePoints = {
  "A+": 4.0,
  A: 4.0,
  "A-": 3.67,
  "B+": 3.33,
  B: 3.0,
  "B-": 2.67,
  "C+": 2.33,
  C: 2.0,
  "C-": 1.67,
  "D+": 1.33,
  D: 1.0,
  F: 0.0,
};

const getGrades = async (req, res) => {
  try {
    const grades = await Grade.findOne({ userId: req.user._id });
    if (grades) res.status(200).send(grades);
    else {
      const grades = new Grade();
      grades.userId = req.user._id;
      grades.grades = gradePoints;
      await grades.save();
      res.status(200).send({ grade: grades });
    }
  } catch (error) {
    res
      .status(400)
      .send({ title: "Error getting grades.", msg: error.message });
  }
};

const updateGrades = async (req, res) => {
  try {
    const { grade } = req.body;
    const grades = await Grade.findOneAndUpdate(
      { userId: req.user._id },
      { grades: grade },
      { new: true }
    );
    res.status(200).send(grades);
  } catch (error) {
    res
      .status(400)
      .send({ title: "Error getting grades.", msg: error.message });
  }
};

const restoreGrades = async (req, res) => {
  try {
    const grades = await Grade.findOneAndUpdate(
      { userId: req.user._id },
      { grades: gradePoints },
      { new: true }
    );
    res.status(200).send(grades);
  } catch (error) {
    res
      .status(400)
      .send({ title: "Error getting grades.", msg: error.message });
  }
};

module.exports = {
  getGrades,
  updateGrades,
  restoreGrades,
};
