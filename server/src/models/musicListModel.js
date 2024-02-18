const { Schema, model } = require("mongoose");
const { COLLECTION_NAME, DOCUMENT_NAME } = require("../configs");

const musicListSchema = Schema(
  {
    name: {
      type: String,
    },
    type: {
      type: String,
      enum: ["LikedSongs", "Playlist", "Album"],
      default: "Playlist",
    },
    imageURL: {
      type: String,
    },
    description: { type: String, default: "This is some description" },
    musiclist_attributes: {
      type: Schema.ObjectId,
      ref: function () {
        return this.type;
      },
      required: true,
    },
    songs: {
      type: [
        {
          type: Schema.ObjectId,
          ref: function () {
            if (this.type === "Album") return DOCUMENT_NAME.SONG;
            else return DOCUMENT_NAME.PLAYLISTSONG; // Liked Songs and playlist
          },
        },
      ],
      default: [],
    },
    genres: {
      type: [{ type: Schema.ObjectId, ref: DOCUMENT_NAME.GENRE }],
      default: [],
    },
  },
  { collection: COLLECTION_NAME.MUSICLIST, timestamps: true }
);

const playlistSongSchema = Schema(
  {
    song: {
      type: Schema.ObjectId,
      ref: DOCUMENT_NAME.SONG,
    },
    dateAdded: { type: Date, default: Date.now() },
  },
  { collection: COLLECTION_NAME.PLAYLISTSONG, timestamps: true }
);

const albumSchema = Schema(
  {
    releasedDate: {
      type: Date,
      default: Date.now(),
      required: true,
    },
    singers: {
      type: [{ type: Schema.ObjectId, ref: DOCUMENT_NAME.SINGER }],
      default: [],
    },
  },
  { collection: COLLECTION_NAME.ALBUM, timestamps: true }
);
const playlistSchema = Schema(
  {
    releasedDate: {
      type: Date,
      default: Date.now(),
      required: true,
    },
    user: { type: Schema.ObjectId, ref: DOCUMENT_NAME.USER },
  },
  { collection: COLLECTION_NAME.PLAYLIST, timestamps: true }
);
const likedSongsSchema = Schema(
  {
    user: { type: Schema.ObjectId, ref: DOCUMENT_NAME.USER },
  },
  { collection: COLLECTION_NAME.LIKEDSONGS, timestamps: true }
);
module.exports = {
  MusicList: model(DOCUMENT_NAME.MUSICLIST, musicListSchema),
  Album: model(DOCUMENT_NAME.ALBUM, albumSchema),
  Playlist: model(DOCUMENT_NAME.PLAYLIST, playlistSchema),
  LikedSongs: model(DOCUMENT_NAME.LIKEDSONGS, likedSongsSchema),
  PlaylistSong: model(DOCUMENT_NAME.PLAYLISTSONG, playlistSongSchema),
};
