const express = require("express");
const SingerController = require("../controllers/SingerController");
const asyncHandler = require("../helpers/asyncHandler");
const { protect } = require("../auth/authUtils");

const router = express.Router();


router.route("/").get(
  // #swagger.tags = ['Singer']
  // #swagger.summary = 'Get all singers'
  asyncHandler(SingerController.getAllSingers)
);
router.route("/:id/album").get(
  // #swagger.tags = ['Singer']
  // #swagger.summary = 'Get album by singer'
  asyncHandler(SingerController.getAlbumBySinger)
);
router.route("/:id").get(
  // #swagger.tags = ['Singer']
  // #swagger.summary = 'Get singer'
  asyncHandler(SingerController.getSinger)
);

router.use(protect);
router.route("/songs/all").get(
  // #swagger.tags = ['Singer']
  // #swagger.summary = 'Get singer by user'
  /* #swagger.security = [{
          "apiKeyAuth": [],
          "clientId": []
        }] 
      */
  asyncHandler(SingerController.getSingerByUser)
);
router.route("/").post(
  // #swagger.tags = ['Singer']
  // #swagger.summary = 'Create singer'
  /* #swagger.security = [{
          "apiKeyAuth": [],
          "clientId": []
        }] 
      */
  asyncHandler(SingerController.createSinger)
);
router
  .route("/:id")
  .patch(
    // #swagger.tags = ['Singer']
    // #swagger.summary = 'Update singer'
    /* #swagger.security = [{
          "apiKeyAuth": [],
          "clientId": []
        }] 
      */
    asyncHandler(SingerController.updateSinger)
  )
  .delete(
    // #swagger.tags = ['Singer']
    // #swagger.summary = 'Delete singer'
    /* #swagger.security = [{
          "apiKeyAuth": [],
          "clientId": []
        }] 
      */
    asyncHandler(SingerController.deleteSinger)
  );

module.exports = router;
