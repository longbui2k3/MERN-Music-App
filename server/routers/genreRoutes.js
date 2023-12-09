const express = require("express");
const {
  createGenre,
  getGenres,
  updateGenre,
  getGenresById,
  deleteGenre,
} = require("../controllers/genreController");
const authenController = require("../controllers/authenController");
const router = express.Router();

router
  .route("/")
  .get(getGenres)
  .post(
    authenController.protect,
    authenController.restrictTo("admin"),
    createGenre
  );
router
  .route("/:id")
  .put(
    authenController.protect,
    authenController.restrictTo("admin"),
    updateGenre
  )
  .get(getGenresById)
  .delete(
    authenController.protect,
    authenController.restrictTo("admin"),
    deleteGenre
  );

module.exports = router;
