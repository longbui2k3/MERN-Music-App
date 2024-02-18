const { Schema, model } = require("mongoose");
const { COLLECTION_NAME, DOCUMENT_NAME } = require("../configs");

const singerSchema = new Schema(
  {
    name: { type: String, required: true },
    stageName: { type: String, required: true },
    birthDate: { type: Date, required: true },
    nation: { type: String, required: true },
    user: { type: Schema.ObjectId, ref: DOCUMENT_NAME.USER },
    songs: {
      type: [{ type: Schema.ObjectId, ref: DOCUMENT_NAME.SONG }],
      default: [],
    },
    musicLists: {
      type: [{ type: Schema.ObjectId, ref: DOCUMENT_NAME.MUSICLIST }],
      default: [],
    },
  },
  {
    collection: COLLECTION_NAME.SINGER,
    timestamps: true,
  }
);

const Singer = model(DOCUMENT_NAME.SINGER, singerSchema);

module.exports = Singer;
