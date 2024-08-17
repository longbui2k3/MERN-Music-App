const express = require("express");
const AlbumController = require("../controllers/AlbumController");
const asyncHandler = require("../helpers/asyncHandler");
const { protect } = require("../auth/authUtils");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

router.route("/:albumId").get(
  // #swagger.tags = ['Album']
  // #swagger.summary = 'Get album by id'
  asyncHandler(AlbumController.getAlbumById)
);
router.route("/").get(
  // #swagger.tags = ['Album']
  // #swagger.summary = 'Get all albums'
  asyncHandler(AlbumController.findAllAlbums)
);
router.use(protect);

router.route("/").post(
  upload.single("image"),
  // #swagger.tags = ['Album']
  // #swagger.summary = 'Create album'
  /* #swagger.security = [{
      "apiKeyAuth": [],
      "clientId": []
    }] 
  */
  asyncHandler(AlbumController.createAlbum)
);

module.exports = router;
