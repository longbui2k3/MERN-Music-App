const express = require("express");
const SongController = require("../controllers/SongController");
const asyncHandler = require("../helpers/asyncHandler");
const { protect } = require("../auth/authUtils");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

router.route("/").get(asyncHandler(SongController.getAllSongs));
router.route("/:id").get(asyncHandler(SongController.getSong));

router.use(protect);

router.route("/").post(upload.any(), asyncHandler(SongController.createSong));

module.exports = router;
