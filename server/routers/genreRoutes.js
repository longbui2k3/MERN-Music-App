const express = require("express");
const {
  createGenre,
  getGenres,
  updateGenre,
  getGenresById,
  deleteGenre,
} = require("../controllers/genreController");
const router = express.Router();

router.route("/").get(getGenres);
router.route("/").post(createGenre);
router.route("/:id").put(updateGenre).get(getGenresById).delete(deleteGenre);

module.exports = router;
