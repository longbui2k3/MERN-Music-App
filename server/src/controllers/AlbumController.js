"use strict";

const { CREATED, OK } = require("../core/successResponse");
const {
  MusicListFactory,
  AlbumFactory,
} = require("../services/MusicListService");

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
  static findAllAlbums = async (req, res, next) => {
    const { singer, limit } = req.query;
    const musiclists = await MusicListFactory.findAllMusicLists({
      type: "Album",
      filter: { singer },
      limit,
    });
    new OK({
      message: "Get all albums by singer successfully!",
      metadata: {
        albums: musiclists,
      },
    }).send(res);
  };
}

module.exports = AlbumController;
