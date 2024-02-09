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
  releasedDate: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  writtenBy: {
    type: String,
  },
  producedBy: {
    type: String,
  },
  imageURL: {
    type: String,
    required: true,
  },
  songURL: {
    type: String,
    required: true,
  },
  duration: { type: String, required: true },
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
  // authors: [
  //   {
  //     type: mongoose.Schema.ObjectId,
  //     ref: "Author",
  //   },
  // ],
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

// songSchema.path("authors").validate(function (value) {
//   return value.length > 0;
// }, "authors must not be empty");

songSchema.path("genres").validate(function (value) {
  return value.length > 0;
}, "genres must not be empty");

const Song = mongoose.model("Song", songSchema);

module.exports = Song;
