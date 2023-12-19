const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const singerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  stageName: {
    type: String,
  },
  birthDate: {
    type: Date,
  },
  nation: {
    type: String,
    required: true,
  },
  songs: [{ type: mongoose.Schema.ObjectId, ref: "Song" }],
  albums: [{ type: mongoose.Schema.ObjectId, ref: "Album" }],
});

const Singer = mongoose.model("Singer", singerSchema);

module.exports = Singer;
