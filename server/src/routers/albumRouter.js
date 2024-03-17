const express = require("express");
const AlbumController = require("../controllers/AlbumController");
const asyncHandler = require("../helpers/asyncHandler");
const { protect } = require("../auth/authUtils");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

router.route("/:albumId").get(asyncHandler(AlbumController.getAlbumById));
router.route("/").get(asyncHandler(AlbumController.findAllAlbums));
router.use(protect);

router
  .route("/")
  .post(upload.single("image"), asyncHandler(AlbumController.createAlbum));

module.exports = router;
