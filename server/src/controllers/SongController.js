"use strict";

const { OK, CREATED } = require("../core/successResponse");
const SongService = require("../services/SongService");

class SongController {
  static getAllSongs = async (req, res, next) => {
    const songs = await SongService.getAllSongs({ search: req.query.search });
    new OK({
      message: "Get all songs successfully!",
      metadata: {
        songs,
      },
    }).send(res);
  };

  static getSong = async (req, res, next) => {
    const song = await SongService.getSong(req.params.id);

    new OK({
      message: "Get song successfully!",
      metadata: {
        song,
      },
    }).send(res);
  };

  static createSong = async (req, res, next) => {
    const song = await SongService.createSong({
      body: req.body,
      files: req.files,
    });

    new CREATED({
      message: "Create song successfully!",
      metadata: {
        song,
      },
    }).send(res);
  };
}

module.exports = SongController;
