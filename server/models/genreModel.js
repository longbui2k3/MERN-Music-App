const mongoose = require("mongoose");
const genreModel = mongoose.Schema(
  {
    name: {
      type: String,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("genre", genreModel);
