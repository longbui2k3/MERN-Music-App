const { Schema, model } = require("mongoose");
const { COLLECTION_NAME, DOCUMENT_NAME } = require("../configs");

const folderSchema = Schema(
  {
    name: { type: String, required: true, default: "New Folder" },
    user: { type: Schema.ObjectId, ref: DOCUMENT_NAME.USER },
    dateAdded: { type: Date, default: Date.now() },
    datePlayed: { type: Date, required: true, default: Date.now() },
    left: { type: Number, default: 0 },
    right: { type: Number, default: 0 },
    parentId: { type: Schema.ObjectId, ref: DOCUMENT_NAME.FOLDER },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME.FOLDER,
  }
);

const Folder = model(DOCUMENT_NAME.FOLDER, folderSchema);

const folderMusicListSchema = Schema(
  {
    musicList: { type: Schema.ObjectId, ref: DOCUMENT_NAME.MUSICLIST },
    dateAdded: { type: Date, required: true, default: Date.now() },
    datePlayed: { type: Date, required: true, default: Date.now() },
    left: { type: Number, default: 0 },
    right: { type: Number, default: 0 },
    parentId: { type: Schema.ObjectId, ref: DOCUMENT_NAME.FOLDER },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME.FOLDERMUSICLIST,
  }
);

const FolderMusicList = model(
  DOCUMENT_NAME.FOLDERMUSICLIST,
  folderMusicListSchema
);

module.exports = { Folder, FolderMusicList };
