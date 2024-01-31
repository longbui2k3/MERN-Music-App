const mongoose = require("mongoose");
const genreModel = mongoose.Schema(
  {
    name: {
      type: String,
    },
    songs: [{ type: mongoose.Schema.ObjectId, ref: "Song" }],
    listSongs: [{ type: mongoose.Schema.ObjectId, ref: "ListSongs" }],
  },
  { timestamp: true }
);

const Genre = mongoose.model("Genre", genreModel);
module.exports = Genre;
