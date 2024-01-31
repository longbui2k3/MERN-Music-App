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
    type: mongoose.Schema.ObjectId,
    ref: "ListSongs",
  },
  singers: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Singer",
    },
  ],
  authors: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Author",
    },
  ],
  genres: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Genre",
    },
  ],
});

songSchema.path("singers").validate(function (value) {
  return value.length > 0;
}, "singers must not be empty");

songSchema.path("authors").validate(function (value) {
  return value.length > 0;
}, "authors must not be empty");

songSchema.path("genres").validate(function (value) {
  return value.length > 0;
}, "genres must not be empty");

const Song = mongoose.model("Song", songSchema);
Song.collection.createIndex({ name: 'text' }, { default_language: 'none', language_override: 'none' });

module.exports = Song;
