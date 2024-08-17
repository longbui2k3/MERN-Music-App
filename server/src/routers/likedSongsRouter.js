"use strict";

const express = require("express");
const LikedSongsController = require("../controllers/LikedSongsController");
const asyncHandler = require("../helpers/asyncHandler");
const { protect } = require("../auth/authUtils");
const router = express.Router();

router.use(protect);
router.route("/songs").post(
  // #swagger.tags = ['Liked Songs']
  // #swagger.summary = 'Add song to liked songs'
  /* #swagger.security = [{
      "apiKeyAuth": [],
      "clientId": []
    }] 
  */
  asyncHandler(LikedSongsController.addSongToMusicList)
);
router.route("/songs/:songId").delete(
  // #swagger.tags = ['Liked Songs']
  // #swagger.summary = 'Remove song from liked songs'
  /* #swagger.security = [{
      "apiKeyAuth": [],
      "clientId": []
    }] 
  */
  asyncHandler(LikedSongsController.removeSongFromMusicList)
);
router.route("/user").get(
  // #swagger.tags = ['Liked Songs']
  // #swagger.summary = 'Get liked songs by user'
  /* #swagger.security = [{
      "apiKeyAuth": [],
      "clientId": []
    }] 
  */
  asyncHandler(LikedSongsController.getPlaylistByUser)
);

module.exports = router;
