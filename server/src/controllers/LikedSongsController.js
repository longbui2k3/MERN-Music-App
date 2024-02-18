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
      userId: req.user.id,
    });
    new CREATED({
      message: "Add to liked songs successfully!",
      metadata: {
        likedsongs: updatedLikedSongs,
      },
    }).send(res);
  };

  static removeSongFromMusicList = async (req, res, next) => {
    await MusicListFactory.removeSongFromMusicList({
      type: "LikedSongs",
      playlistsong_id: req.params.playlistsong_id,
      userId: req.user.id,
    });

    new OK({
      message: "Remove from liked songs successfully!",
    }).send(res);
  };

  static getPlaylistByUser = async (req, res, next) => {
    const likedSongs = await PlaylistFactory.getPlaylistByUser({
      type: "LikedSongs",
      user: req.user.id,
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

