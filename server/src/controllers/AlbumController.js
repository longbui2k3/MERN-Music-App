"use strict";

const { CREATED, OK } = require("../core/successResponse");
const { MusicListFactory } = require("../services/MusicListService");

class AlbumController {
  static createAlbum = async (req, res, next) => {
    const musiclist = await MusicListFactory.createMusicList({
      type: "Album",
      payload: req.body,
      file: req.file,
    });

    new CREATED({
      message: "Create album successfully!",
      metadata: {
        album: musiclist,
      },
    }).send(res);
  };
  static getAlbumById = async (req, res, next) => {
    const musiclist = await MusicListFactory.getMusicListById({
      type: "Album",
      id: req.params.albumId,
    });

    new OK({
      message: "Get album by id successfully!",
      metadata: {
        album: musiclist,
      },
    }).send(res);
  };
}

module.exports = AlbumController;
