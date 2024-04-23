const express = require("express");
const SectionController = require("../controllers/SectionController");
const asyncHandler = require("../helpers/asyncHandler");
const { protect, restrictTo } = require("../auth/authUtils");

const router = express.Router();

router
  .route("/")
  // .get(asyncHandler(SectionController.getSectionOfAdmin))
  .get(asyncHandler(SectionController.getAllSection));
router.route("/:sectionId").get(asyncHandler(SectionController.getSectionById));

router.use(protect);
router.route("/").post(asyncHandler(SectionController.createSection));
router
  .route("/:sectionId")
  .patch(asyncHandler(SectionController.updateSection))
  .delete(asyncHandler(SectionController.deleteSection));

router
  .route("/musiclist")
  .post(asyncHandler(SectionController.addMusiclistToLists));
router.route("/singer").post(asyncHandler(SectionController.addSingerToLists));
module.exports = router;
