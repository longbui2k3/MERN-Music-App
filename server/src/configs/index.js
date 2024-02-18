"use strict";
const jwt = require("jsonwebtoken");

const DOCUMENT_NAME = {
  GENRE: "Genre",
  MUSICLIST: "MusicList",
  SECTION: "Section",
  SINGER: "Singer",
  SONG: "Song",
  USER: "User",
  ALBUM: "Album",
  PLAYLIST: "Playlist",
  LIKEDSONGS: "LikedSongs",
  PLAYLISTSONG: "PlaylistSong"
};

const COLLECTION_NAME = {
  GENRE: "genres",
  MUSICLIST: "musiclists",
  SECTION: "sections",
  SINGER: "singers",
  SONG: "songs",
  USER: "users",
  ALBUM: "albums",
  PLAYLIST: "playlists",
  LIKEDSONGS: "likedsongs",
  PLAYLISTSONG: "playlistsongs",
};

const LIKEDSONGS_IMAGE_URL =
  "https://firebasestorage.googleapis.com/v0/b/auth-music-app.appspot.com/o/likedsongs%2Fliked-songs-640.png?alt=media&token=ee40dd54-6533-4df6-93b5-61e4d6b75f82";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  DOCUMENT_NAME,
  COLLECTION_NAME,
  LIKEDSONGS_IMAGE_URL,
  generateToken,
};
