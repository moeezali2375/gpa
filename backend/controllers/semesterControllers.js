const Semester = require("../models/semesterModel");

const getSemesters = async (req, res) => {
  try {
    const semesters = await Semester.find({ userId: req.user._id });
    res.status(200).send({ semesters: semesters });
  } catch (error) {
    res.status(400).send({ msg: { title: error.message } });
  }
};

const addSemester = async (req, res) => {
  try {
    const { _id, number, season, year } = req.body;
    const semester = new Semester({
      _id: _id,
      number: parseInt(number),
      season: parseInt(season),
      year: parseInt(year),
      userId: req.user._id,
    });
    await semester.save();
    res.status(200).send({
      msg: { title: "Semester Added! 🎉", desc: "Continue Planning...." },
    });
  } catch (error) {
    res.status(400).send({ msg: { title: error.message } });
  }
};

const deleteSemester = async (req, res) => {
  try {
    const semesterId = req.params.semesterId;
    if (
      await Semester.findOneAndDelete({ _id: semesterId, userId: req.user._id })
    )
      res.status(200).send({
        msg: { title: "Semester Deleted! 🎉", desc: "Continue Planning...." },
      });
    else throw new Error("No such semester exists. 😓");
  } catch (error) {
    res.status(400).send({ msg: { title: error.message } });
  }
};

const updateSemester = async (req, res) => {
  try {
    const { number, season, year } = req.body;
    const semesterId = req.params.semesterId;

    const updateFields = {};
    if (number !== undefined) updateFields.number = parseInt(number);
    if (season !== undefined) updateFields.season = parseInt(season);
    if (year !== undefined) updateFields.year = parseInt(year);

    const data = await Semester.findOneAndUpdate(
      {
        userId: req.user._id,
        _id: semesterId,
      },
      updateFields,
      { new: true },
    );

    if (!data) throw new Error("Invalid Request. ☹️");

    return res.status(200).send({
      msg: { title: "Semester Updated! 🎉", desc: "Continue Planning...." },
    });
  } catch (error) {
    res.status(400).send({ msg: { title: error.message } });
  }
};

const updateSemesterCourses = async (req, res) => {
  try {
    const { courses } = req.body;
    const semesterId = req.params.semesterId;
    const data = await Semester.findOneAndUpdate(
      {
        _id: semesterId,
        userId: req.user._id,
      },
      { courses: courses },
    );
    if (!data) throw new Error("Invalid Request. ☹️");
    return res.status(200).send({ noti: "Done." });
  } catch (error) {
    res.status(400).send({ msg: { title: error.message } });
  }
};

module.exports = {
  getSemesters,
  addSemester,
  deleteSemester,
  updateSemester,
  updateSemesterCourses,
};
