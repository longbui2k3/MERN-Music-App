const express = require("express");
const playlistController = require("../controllers/playListController");
const authenController = require("../controllers/authenController");
const router = express.Router();

router.route("/").get(playlistController.getAllPlaylist);

router
  .route("/:userId")
  .get(playlistController.getAllPlaylistsById)
  .post(
    authenController.protect,
    authenController.restrictTo("admin"),
    playlistController.createPlaylist
  );

router
  .route("/:userId/:playlistId")
  .get(playlistController.getPlaylistById)
  .patch(
    authenController.protect,
    authenController.restrictTo("admin"),
    playlistController.updatePlaylist
  )
  .delete(
    authenController.protect,
    authenController.restrictTo("admin"),
    playlistController.deletePlaylist
  );
module.exports = router;
