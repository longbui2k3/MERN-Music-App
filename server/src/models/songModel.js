const { Schema, model } = require("mongoose");
const { DOCUMENT_NAME, COLLECTION_NAME } = require("../configs");

const songSchema = new Schema(
  {
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
      type: Schema.ObjectId,
      ref: DOCUMENT_NAME.MUSICLIST,
    },
    singers: [
      {
        type: Schema.ObjectId,
        ref: DOCUMENT_NAME.SINGER,
      },
    ],
    genres: [
      {
        type: Schema.ObjectId,
        ref: DOCUMENT_NAME.GENRE,
      },
    ],
  },
  {
    collection: COLLECTION_NAME.SONG,
    timestamps: true,
  }
);

songSchema.path("singers").validate(function (value) {
  return value.length > 0;
}, "singers must not be empty");
songSchema.path("genres").validate(function (value) {
  return value.length > 0;
}, "genres must not be empty");
songSchema.index(
  { name: "text" },
  { default_language: "none", language_override: "none" }
);
module.exports = model(DOCUMENT_NAME.SONG, songSchema);
