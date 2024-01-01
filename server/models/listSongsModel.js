const mongoose = require("mongoose");

const listSongsSchema = mongoose.Schema({
  name: {
    type: String,
  },
  type: {
    type: String,
    enum: ["LikedSongs", "Playlist", "Album"],
    default: "Playlist",
  },
  imageURL: {
    type: String,
  },
  description: { type: String, default: "This is some description" },
  singers: [{ type: mongoose.Schema.ObjectId, ref: "Singer" }],
  songs: [{ type: mongoose.Schema.ObjectId, ref: "Song" }],
});
const ListSongs = mongoose.model("ListSongs", listSongsSchema);
module.exports = ListSongs;
