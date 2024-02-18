const express = require("express");
const GenreController = require("../controllers/GenreController");
const asyncHandler = require("../helpers/asyncHandler");
const { protect } = require("../auth/authUtils");

const router = express.Router();

router.route("/").get(asyncHandler(GenreController.getGenres));
router.route("/:id").get(asyncHandler(GenreController.getGenresById));

router.use(protect);

router.route("/").post(asyncHandler(GenreController.createGenre));
router
  .route("/:id")
  .put(asyncHandler(GenreController.updateGenre))
  .delete(asyncHandler(GenreController.deleteGenre));

module.exports = router;
