const mongoose = require("mongoose");
const genreModel = mongoose.Schema(
  {
    name: {
      type: String,
    },
    songs: [{ type: mongoose.Schema.ObjectId, ref: "Song" }],
  },
  { timestamp: true }
);

module.exports = mongoose.model("genre", genreModel);
