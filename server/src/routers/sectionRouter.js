const express = require("express");
const SectionController = require("../controllers/SectionController");
const asyncHandler = require("../helpers/asyncHandler");
const { protect, restrictTo } = require("../auth/authUtils");

const router = express.Router();

router
  .route("/")
  // .get(asyncHandler(SectionController.getSectionOfAdmin))
  .get(
    // #swagger.tags = ['Section']
    // #swagger.summary = 'Get all sections'
    asyncHandler(SectionController.getAllSection)
  );
router.route("/:sectionId").get(
  // #swagger.tags = ['Section']
  // #swagger.summary = 'Get section by id'
  asyncHandler(SectionController.getSectionById)
);

router.use(protect);
router.route("/").post(
  // #swagger.tags = ['Section']
  // #swagger.summary = 'Create section'
  /* #swagger.security = [{
          "apiKeyAuth": [],
          "clientId": []
        }] 
      */
  asyncHandler(SectionController.createSection)
);
router
  .route("/:sectionId")
  .patch(
    // #swagger.tags = ['Section']
    // #swagger.summary = 'Update section'
    /* #swagger.security = [{
          "apiKeyAuth": [],
          "clientId": []
        }] 
      */
    asyncHandler(SectionController.updateSection)
  )
  .delete(
    // #swagger.tags = ['Section']
    // #swagger.summary = 'Delete section'
    /* #swagger.security = [{
          "apiKeyAuth": [],
          "clientId": []
        }] 
      */
    asyncHandler(SectionController.deleteSection)
  );

router.route("/musiclist").post(
  // #swagger.tags = ['Section']
  // #swagger.summary = 'Add musiclist to lists'
  /* #swagger.security = [{
          "apiKeyAuth": [],
          "clientId": []
        }] 
      */
  asyncHandler(SectionController.addMusiclistToLists)
);
router.route("/singer").post(
  // #swagger.tags = ['Section']
  // #swagger.summary = 'Add singer to lists'
  /* #swagger.security = [{
          "apiKeyAuth": [],
          "clientId": []
        }] 
      */
  asyncHandler(SectionController.addSingerToLists)
);
module.exports = router;
