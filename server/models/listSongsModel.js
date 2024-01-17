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
  singers: {
    type: [{ type: mongoose.Schema.ObjectId, ref: "Singer" }],
    default: [],
  },
  songs: {
    type: [{ type: mongoose.Schema.ObjectId, ref: "Song" }],
    default: [],
  },
  user: { type: mongoose.Schema.ObjectId, ref: "User" },
});
const ListSongs = mongoose.model("ListSongs", listSongsSchema);
module.exports = ListSongs;
