"use strict";

const { BadRequestError } = require("../core/errorResponse");
const Genre = require("../models/genreModel");

class GenreService {
  async getGenres({ search }) {
    return await Genre.find({ name: { $regex: search || "", $options: "i" } });
  }
  async createGenre({ name }) {
    if (!name) {
      throw new BadRequestError("Please enter name of genre!");
    }
    const genre = await Genre.create({
      name,
    });

    if (!genre) {
      throw new BadRequestError("Create genre unsuccessfully!");
    }
    return genre;
  }

  async getGenresById({ id }) {
    const genre = await Genre.findById(id);

    if (!genre) {
      throw new BadRequestError("Genre with this id is not found!");
    }

    return genre;
  }

  async updateGenre({id, body}) {
    return await Genre.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
  }

  async deleteGenre({id}) {
    await Genre.findByIdAndDelete(id);
  }
}
module.exports = new GenreService();
