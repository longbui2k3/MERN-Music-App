const express = require("express");
const playlistController = require("../controllers/playListController");
const authenController = require("../controllers/authenController");
const router = express.Router();

router.route("/").get(playlistController.getAllPlaylist);

router.route("/all/:userId").get(playlistController.getAllPlaylistsById).post(
  authenController.protect,
  authenController.restrictTo("user"),
  playlistController.createPlaylist
);
router
  .route("/:playlistId")
  .get(playlistController.getPlaylistById)
  .patch(
    authenController.protect,
    authenController.restrictTo("admin"),
    playlistController.updatePlaylist
  );
router
  .route("/:playlistId/:userId")
  .delete(
    authenController.protect,
    authenController.restrictTo("admin"),
    playlistController.deletePlaylist
  );
module.exports = router;
