"use strict";
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
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
  PLAYLISTSONG: "PlaylistSong",
  FOLDER: "Folder",
  FOLDERMUSICLIST: "FolderMusiclist",
  KEYTOKEN: "KeyToken",
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
  FOLDER: "folders",
  FOLDERMUSICLIST: "foldermusiclists",
  KEYTOKEN: "keytokens",
};

const LIKEDSONGS_IMAGE_URL =
  "https://firebasestorage.googleapis.com/v0/b/auth-music-app.appspot.com/o/likedsongs%2Fliked-songs-640.png?alt=media&token=ee40dd54-6533-4df6-93b5-61e4d6b75f82";

const generateKey = () => {
  return crypto.randomBytes(64).toString("hex");
};

const generateToken = async (payload, key, expiresIn) => {
  return await jwt.sign(payload, key, {
    expiresIn: expiresIn,
  });
};

module.exports = {
  DOCUMENT_NAME,
  COLLECTION_NAME,
  LIKEDSONGS_IMAGE_URL,
  generateToken,
  generateKey,
};
