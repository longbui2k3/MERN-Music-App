const express = require("express");
const likedSongController = require("../controllers/likedSongController");
const authenController = require("../controllers/authenController");
const router = express.Router();

router.route("/").get(likedSongController.getAllLikedSongs);
router
  .route("/:userId/all")
  .get(likedSongController.getAllLikedSongsById)
  .post(
    authenController.protect,
    authenController.restrictTo("admin"),
    likedSongController.createLikedSongs
  );

router.route("/:likedSongId").get(likedSongController.getLikedSongById);

router
  .route("/:userId/:likedSongId")
  .patch(
    authenController.protect,
    authenController.restrictTo("admin"),
    likedSongController.updateLikedSong
  )
  .delete(
    authenController.protect,
    authenController.restrictTo("admin"),
    likedSongController.deleteLikedSong
  );
module.exports = router;
