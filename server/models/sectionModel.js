const mongoose = require("mongoose");

const sectionSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  listSongs: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "ListSongs",
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});

const Section = mongoose.model("Section", sectionSchema);

module.exports = Section;
