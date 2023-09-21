const express = require("express");
const { createGenre, getGenres } = require("../controller/genreController");
const router = express.Router();

router.route("/").get(getGenres);
router.route("/").post(createGenre);

module.exports = router;
