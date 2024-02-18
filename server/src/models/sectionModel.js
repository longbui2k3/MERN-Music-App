const { Schema, model } = require("mongoose");
const { DOCUMENT_NAME, COLLECTION_NAME } = require("../configs");

const sectionSchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    musicLists: {
      type: [
        {
          type: Schema.ObjectId,
          ref: DOCUMENT_NAME.MUSICLIST,
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
  }
);

module.exports = model(DOCUMENT_NAME.SECTION, sectionSchema);
