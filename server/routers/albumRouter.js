const express = require("express");
const albumController = require("../controllers/albumController");
const authenController = require("../controllers/authenController");
const router = express.Router();

router.route("/").get(albumController.getAllAlbums);
router
  .route("/:userId/all")
  .get(albumController.getAllAlbumsById)
  .post(
    authenController.protect,
    authenController.restrictTo("admin"),
    albumController.createAlbum
  );

router.route("/:albumId").get(albumController.getAlbumById);

router
  .route("/:userId/:albumId")
  .patch(
    authenController.protect,
    authenController.restrictTo("admin"),
    albumController.updateAlbum
  )
  .delete(
    authenController.protect,
    authenController.restrictTo("admin"),
    albumController.deleteAlbum
  );
module.exports = router;
