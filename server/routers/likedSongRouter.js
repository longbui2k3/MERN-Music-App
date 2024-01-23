const express = require("express");
const likedSongController = require("../controllers/likedSongController");
const authenController = require("../controllers/authenController");
const router = express.Router();

router.route("/").get(likedSongController.getAllLikedSongs);
router
  .route("/all/:userId")
  .get(likedSongController.getAllLikedSongsById)
  .post(
    authenController.protect,
    // authenController.restrictTo("admin"),
    likedSongController.createLikedSongs
  );

router
  .route("/:likedSongId")
  .get(likedSongController.getLikedSongById)
  .patch(
    authenController.protect,
    authenController.restrictTo("admin"),
    likedSongController.updateLikedSong
  );

router
  .route("/:likedSongId/:userId")
  .delete(
    authenController.protect,
    authenController.restrictTo("admin"),
    likedSongController.deleteLikedSong
  );
module.exports = router;
