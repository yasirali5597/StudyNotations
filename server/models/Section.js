const mongoose = require("mongoose");
const subSection = require("./subSection");

const SectionSchema = new mongoose.Schema({
  sectionName: {
    type: String,
  },
  subSection: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subSection",
      required: true,
    },
  ],
});

module.exports = mongoose.model("Section", SectionSchema);
