const express = require("express");
const sectionController = require("../controllers/sectionController");
const router = express.Router();

router
  .route("/")
  .get(sectionController.getSectionOfAdmin)
  .post(sectionController.createSection);

router
  .route("/:sectionId")
  .get(sectionController.getSectionById)
  .patch(sectionController.updateSection)
  .delete(sectionController.deleteSection);

module.exports = router;
