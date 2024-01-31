const express = require("express");
const songController = require("../controllers/songController");
const authenController = require("../controllers/authenController");
const router = express.Router();

router.route("/").get(songController.getAllSongs).post(
  songController.uploadSingle,
  songController.createSong
);

router
  .route("/:id")
  .get(songController.getSong)
  .delete(
    // authenController.protect,
    // authenController.restrictTo("admin"),
    songController.deleteSong
  )
  .patch(
    authenController.protect,
    authenController.restrictTo("admin"),
    songController.updateSong
  );

module.exports = router;
