const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const singerSchema = new Schema({
  name: { type: String, required: true },
  stageName: { type: String, required: true },
  birthDate: {type: Date, required: true},
  nation: {type: String, required: true},
  user: { type: mongoose.Schema.ObjectId, ref: "User" },
  songs: [{ type: mongoose.Schema.ObjectId, ref: "Song" }],
  listSongs: [{ type: mongoose.Schema.ObjectId, ref: "ListSongs" }],
});

const Singer = mongoose.model("Singer", singerSchema);

module.exports = Singer;
