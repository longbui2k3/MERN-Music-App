const express = require("express");
const SectionController = require("../controllers/SectionController");
const asyncHandler = require("../helpers/asyncHandler");
const { protect } = require("../auth/authUtils");

const router = express.Router();

router.route("/").get(asyncHandler(SectionController.getAllSection));
router.route("/:sectionId").get(asyncHandler(SectionController.getSectionById));

router.use(protect);
router.route("/").post(asyncHandler(SectionController.createSection));
router
  .route("/:sectionId")
  .patch(asyncHandler(SectionController.updateSection))
  .delete(asyncHandler(SectionController.deleteSection));

module.exports = router;
