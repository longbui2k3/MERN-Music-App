"use strict";

const { OK, CREATED } = require("../core/successResponse");
const GenreService = require("../services/GenreService");

class GenreController {
  static getGenres = async (req, res, next) => {
    const genres = await GenreService.getGenres(req.query);
    new OK({
      message: "Get genres successfully!",
      metadata: {
        genres,
      },
    }).send(res);
  };
  static createGenre = async (req, res, next) => {
    const genre = await GenreService.createGenre(req.body);

    new CREATED({
      message: "Create genre successfully!",
      metadata: {
        genre,
      },
    }).send(res);
  };
  static getGenresById = async (req, res, next) => {
    const genre = await GenreService.getGenresById({ id: req.params.id });

    new OK({
      message: "Get genre successfully!",
      metadata: {
        genre,
      },
    }).send(res);
  };

  static updateGenre = async (req, res, next) => {
    const genre = await GenreService.updateGenre({ id: req.params.id });

    new OK({
      message: "Update genre successfully!",
      metadata: {
        genre,
      },
    }).send(res);
  };

  static deleteGenre = async (req, res, next) => {
    await GenreService.deleteGenre({ id: req.params.id });

    new OK({
      message: "Delete genre successfully!",
    }).send(res);
  };
}
module.exports = GenreController;
