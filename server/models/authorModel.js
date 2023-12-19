const mongoose = require("mongoose");

const authorSchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  image: {
    type: String,
  },
  songs: [{ type: mongoose.Schema.ObjectId, ref: "Song" }],
});

const author = mongoose.model("Author", authorSchema);
module.exports = author;
