"use strict";

const { CREATED, OK } = require("../core/successResponse");
const {
  MusicListFactory,
  PlaylistFactory,
} = require("../services/MusicListService");

class LikedSongsController {
  static addSongToMusicList = async (req, res, next) => {
    const updatedLikedSongs = await MusicListFactory.addSongToMusicList({
      type: "LikedSongs",
      song: req.body.song,
      userId: req.user.userId,
    });
    new CREATED({
      message: "Add to liked songs successfully!",
      metadata: {
        likedSongs: updatedLikedSongs,
      },
    }).send(res);
  };

  static removeSongFromMusicList = async (req, res, next) => {
    const updatedLikedSongs = await MusicListFactory.removeSongFromMusicList({
      type: "LikedSongs",
      song: req.params.songId,
      userId: req.user.userId,
    });

    new OK({
      message: "Remove from liked songs successfully!",
      metadata: { likedSongs: updatedLikedSongs },
    }).send(res);
  };

  static getPlaylistByUser = async (req, res, next) => {
    const likedSongs = await PlaylistFactory.getPlaylistByUser({
      type: "LikedSongs",
      user: req.user.userId,
    });

    new OK({
      message: "Get liked songs by user successfully!",
      metadata: {
        likedSongs,
      },
    }).send(res);
  };
}

module.exports = LikedSongsController;
