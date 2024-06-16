const express = require("express");
const SingerController = require("../controllers/SingerController");
const asyncHandler = require("../helpers/asyncHandler");
const { protect } = require("../auth/authUtils");

const router = express.Router();


router.route("/").get(asyncHandler(SingerController.getAllSingers));
router.route("/:id/album").get(asyncHandler(SingerController.getAlbumBySinger));
router.route("/:id").get(asyncHandler(SingerController.getSinger));

router.use(protect);
router.route("/songs/all").get(asyncHandler(SingerController.getSingerByUser));
router.route("/").post(asyncHandler(SingerController.createSinger));
router
  .route("/:id")
  .patch(asyncHandler(SingerController.updateSinger))
  .delete(asyncHandler(SingerController.deleteSinger));

module.exports = router;
