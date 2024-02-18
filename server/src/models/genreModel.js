"use strict";

const { Schema, model } = require("mongoose");
const { COLLECTION_NAME, DOCUMENT_NAME } = require("../configs");

const genreModel = Schema(
  {
    name: {
      type: String,
    },
    songs: [{ type: Schema.ObjectId, ref: DOCUMENT_NAME.SONG }],
    musicLists: [{ type: Schema.ObjectId, ref: DOCUMENT_NAME.MUSICLIST }],
  },
  {
    collection: COLLECTION_NAME.GENRE,
    timestamps: true,
  }
);

const Genre = model(DOCUMENT_NAME.GENRE, genreModel);
module.exports = Genre;
