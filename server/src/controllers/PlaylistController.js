"use strict";

const { CREATED, OK } = require("../core/successResponse");
const { MusicListFactory } = require("../services/MusicListService");

class PlaylistController {
  static createPlaylist = async (req, res, next) => {
    const musiclist = await MusicListFactory.createMusicList({
      type: "Playlist",
      payload: req.body,
      file: req.file,
      userId: req.user.id,
    });

    new CREATED({
      message: "Create playlist successfully!",
      metadata: {
        playlist: musiclist,
      },
    }).send(res);
  };
  static getPlaylistById = async (req, res, next) => {
    const musiclist = await MusicListFactory.getMusicListById({
      type: "Playlist",
      id: req.params.playlistId,
    });

    new OK({
      message: "Get playlist by id successfully!",
      metadata: {
        playlist: musiclist,
      },
    }).send(res);
  };
  static addSongToMusicList = async (req, res, next) => {
    const updatedPlaylist = await MusicListFactory.addSongToMusicList({
      type: "Playlist",
      song: req.body.song,
      id: req.body.playlist
    });
    new CREATED({
      message: "Add to liked songs successfully!",
      metadata: {
        playlist: updatedPlaylist,
      },
    }).send(res);
  }
}

module.exports = PlaylistController;
