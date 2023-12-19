const mongoose = require("mongoose");

const listSongsSchema = mongoose.Schema({
  name: {
    type: String,
  },
  type: {
    type: String,
    enum: ["LikedSongs", "Playlist", "Album"],
  },
  imageURL: {
    type: String,
  },
  singers: [{ type: mongoose.Schema.ObjectId, ref: "Singer" }],
  songs: [{ type: mongoose.Schema.ObjectId, ref: "Song" }],
});
const ListSongs = mongoose.model("ListSongs", listSongsSchema);
module.exports = ListSongsistSongs;
