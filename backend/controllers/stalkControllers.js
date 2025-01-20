const axios = require("axios");
const stalkModel = require("../models/stalkModel");

const getGPA = async (req, res) => {
  const { rollNo, campID, semID } = req.body;
  try {
    const data = await axios.post(
      "https://flexstudent.nu.edu.pk/ConsolidatedFeeReport/DisplayDuesInSemester",
      {
        rollNo: rollNo,
        semID: semID,
        campID: campID,
      },
    );
    const stalker = await stalkModel.findOne({ email: req.user.email });
    if (stalker) {
      await stalkModel.findByIdAndUpdate(stalker._id, {
        $addToSet: { rollNumberSearched: parseInt(rollNo) },
      });
    } else {
      const newStalker = new stalkModel({
        name: req.user.name,
        email: req.user.email,
        rollNumberSearched: [rollNo],
      });
      await newStalker.save();
    }
    res.status(200).send({
      msg: {
        title: `sgpa: ${data.data["SGPA"]}`,
        desc: `cgpa: ${data.data["CGPA"]}`,
      },
    });
  } catch (error) {
    res.status(400).send({ msg: { title: error.message } });
  }
};

module.exports = {
  getGPA,
};
