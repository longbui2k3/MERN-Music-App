"use strict";

const { OK, CREATED } = require("../core/successResponse");
const SingerService = require("../services/SingerService");

class SingerController {
  static getAllSingers = async (req, res, next) => {
    const singers = await SingerService.getAllSingers(req.query);

    new OK({
      message: "Get singers successfully!",
      metadata: {
        singers,
      },
    }).send(res);
  };

  static getSinger = async (req, res, next) => {
    const singer = await SingerService.getSinger({ id: req.params.id });

    new OK({
      message: "Get singer successfully!",
      metadata: {
        singer,
      },
    }).send(res);
  };
  static getSingerByUser = async (req, res, next) => {
    const singer = await SingerService.getSingerByUser({ _id: req.user.userId });

    new OK({
      message: "Get singer by user successfully!",
      metadata: {
        singer,
      },
    }).send(res);
  };

  static createSinger = async (req, res, next) => {
    const newSinger = await SingerService.createSinger({ body: req.body });

    new CREATED({
      message: "Create singer successfully!",
      metadata: {
        singer: newSinger,
      },
    }).send(res);
  };

  static updateSinger = async (req, res, next) => {
    const updatedSinger = await SingerService.updateSinger({
      id: req.params.id,
      body: req.body,
    });

    new OK({
      message: "Update singer successfully!",
      metadata: {
        singer: updatedSinger,
      },
    }).send(res);
  };

  static deleteSinger = async (req, res, next) => {
    await SingerService.deleteSinger({ id: req.params.id });

    new OK({
      message: "Delete singer successfully!",
    }).send(res);
  };

  static getAlbumBySinger = async (req, res, next) => {
    const albums = await SingerService.getAlbumBySinger({
      id: req.params.id,
    });

    new OK({
      message: "Get album by singer successfully!",
      metadata: {
        albums,
      },
    }).send(res);
  };
}

module.exports = SingerController;
