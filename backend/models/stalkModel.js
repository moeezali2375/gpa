const mongoose = require("mongoose");

const stalkSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  rollNumberSearched: [
    {
      type: Number,
    },
  ],
});

module.exports = mongoose.model("Stalk", stalkSchema);
