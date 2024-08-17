const express = require("express");
const SongController = require("../controllers/SongController");
const asyncHandler = require("../helpers/asyncHandler");
const { protect } = require("../auth/authUtils");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

router.route("/").get(
  // #swagger.tags = ['Song']
  // #swagger.summary = 'Get all songs'
  asyncHandler(SongController.getAllSongs)
);
router.route("/:id").get(
  // #swagger.tags = ['Song']
  // #swagger.summary = 'Get song'
  asyncHandler(SongController.getSong)
);
router.use(protect);

router.route("/").post(
  upload.any(),
  // #swagger.tags = ['Song']
  // #swagger.summary = 'Create song'
  /* #swagger.security = [{
          "apiKeyAuth": [],
          "clientId": []
        }] 
      */
  asyncHandler(SongController.createSong)
);

module.exports = router;
