const asyncHandler = require("express-async-handler");
const Genre = require("../models/genreModel");

const getGenres = asyncHandler(async (req, res) => {
  const genres = await Genre.find();
  res.send(genres);
});

const createGenre = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400);
    throw new Error("Please enter name of genre");
  }

  const genre = await Genre.create({
    name,
  });

  if (genre) {
    res.status(201).json({
      _id: genre._id,
      name: genre.name,
    });
  } else {
    res.status(400);
    throw new Error("Genre not found");
  }
});

module.exports = { getGenres, createGenre };
