"use strict";

const express = require("express");
const LikedSongsController = require("../controllers/LikedsongsController");
const asyncHandler = require("../helpers/asyncHandler");
const { protect } = require("../auth/authUtils");
const router = express.Router();

router.use(protect);
router
  .route("/songs")
  .post(asyncHandler(LikedSongsController.addSongToMusicList));
router
  .route("/songs/:playlistsong_id")
  .delete(asyncHandler(LikedSongsController.removeSongFromMusicList));
router.route("/user").get(asyncHandler(LikedSongsController.getPlaylistByUser));

module.exports = router;
