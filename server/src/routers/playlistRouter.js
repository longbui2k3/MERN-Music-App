const express = require("express");
const PlaylistController = require("../controllers/PlaylistController");
const asyncHandler = require("../helpers/asyncHandler");
const { protect } = require("../auth/authUtils");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

router.route("/:playlistId").get(asyncHandler(PlaylistController.getPlaylistById));
router.use(protect);
router
  .route("/songs")
  .post(asyncHandler(PlaylistController.addSongToMusicList));
router
  .route("/")
  .post(upload.single("image"), asyncHandler(PlaylistController.createPlaylist));

module.exports = router;
