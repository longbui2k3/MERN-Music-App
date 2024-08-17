const express = require("express");
const PlaylistController = require("../controllers/PlaylistController");
const asyncHandler = require("../helpers/asyncHandler");
const { protect } = require("../auth/authUtils");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

router.route("/:playlistId").get(
  // #swagger.tags = ['Playlist']
  // #swagger.summary = 'Get playlist by id'
  asyncHandler(PlaylistController.getPlaylistById)
);
router.use(protect);
router.route("/songs/multiple").post(
  // #swagger.tags = ['Playlist']
  // #swagger.summary = 'Add songs to playlist'
  /* #swagger.security = [{
          "apiKeyAuth": [],
          "clientId": []
        }] 
      */
  asyncHandler(PlaylistController.addSongsToMusicList)
);
router.route("/songs").post(
  // #swagger.tags = ['Playlist']
  // #swagger.summary = 'Add song to playlist'
  /* #swagger.security = [{
      "apiKeyAuth": [],
      "clientId": []
    }] 
  */
  asyncHandler(PlaylistController.addSongToMusicList)
);
router
  .route("/")
  .post(
    upload.single("image"),
    // #swagger.tags = ['Playlist']
    // #swagger.summary = 'Create playlist'
    /* #swagger.security = [{
          "apiKeyAuth": [],
          "clientId": []
        }] 
      */
    asyncHandler(PlaylistController.createPlaylist)
  )
  .patch(
    upload.single("image"),
    // #swagger.tags = ['Playlist']
    // #swagger.summary = 'Update playlist'
    /* #swagger.security = [{
          "apiKeyAuth": [],
          "clientId": []
        }] 
      */
    asyncHandler(PlaylistController.updateMusicList)
  );

module.exports = router;
