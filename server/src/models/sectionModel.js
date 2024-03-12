const { Schema, model } = require("mongoose");
const { DOCUMENT_NAME, COLLECTION_NAME } = require("../configs");

const sectionSchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    type: { type: String, enum: ["MusicList"] },
    lists: {
      type: [
        {
          type: Schema.ObjectId,
          // ref: DOCUMENT_NAME.MUSICLIST,
        },
      ],
      default: [],
    },
    user: {
      type: Schema.ObjectId,
      ref: DOCUMENT_NAME.USER,
    },
  },
  {
    collection: COLLECTION_NAME.SECTION,
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

sectionSchema.virtual("musiclists", {
  ref: DOCUMENT_NAME.MUSICLIST,
  localField: "lists",
  foreignField: "_id",
});

sectionSchema.virtual("singers", {
  ref: DOCUMENT_NAME.SINGER,
  localField: "lists",
  foreignField: "_id",
});

module.exports = model(DOCUMENT_NAME.SECTION, sectionSchema);
