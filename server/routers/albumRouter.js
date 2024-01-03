const express = require("express");
const albumController = require("../controllers/albumController");
const authenController = require("../controllers/authenController");
const router = express.Router();

router.route("/").get(albumController.getAllAlbums);
router.route("/all/:userId").get(albumController.getAllAlbumsById).post(
  // authenController.protect,
  // authenController.restrictTo("admin"),
  albumController.createAlbum
);

router
  .route("/:albumId")
  .get(albumController.getAlbumById)
  .patch(
    authenController.protect,
    authenController.restrictTo("admin"),
    albumController.updateAlbum
  );

router.route("/:albumId/:userId").delete(
  // authenController.protect,
  // authenController.restrictTo("admin"),
  albumController.deleteAlbum
);
module.exports = router;
