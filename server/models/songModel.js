const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const songSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
  songURL: {
    type: String,
    required: true,
  },
  album: {
    type: String,
  },
  artist: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

const Song = mongoose.model("Song", songSchema);

module.exports = Song;
