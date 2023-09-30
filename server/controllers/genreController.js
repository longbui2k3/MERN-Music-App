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

const getGenresById = asyncHandler(async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  res.status(200).json({
    status: "success",
    genre,
  });
});

const updateGenre = asyncHandler(async (req, res) => {
  const updateGenre = await Genre.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    genre: updateGenre,
  });
});

const deleteGenre = asyncHandler(async (req, res) => {
  await Genre.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
  });
});

module.exports = {
  getGenres,
  createGenre,
  getGenresById,
  updateGenre,
  deleteGenre,
};
