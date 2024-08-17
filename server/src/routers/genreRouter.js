const express = require("express");
const GenreController = require("../controllers/GenreController");
const asyncHandler = require("../helpers/asyncHandler");
const { protect } = require("../auth/authUtils");

const router = express.Router();

router.route("/").get(
  // #swagger.tags = ['Genre']
  // #swagger.summary = 'Get genres'
  asyncHandler(GenreController.getGenres)
);
router.route("/:id").get(
  // #swagger.tags = ['Genre']
  // #swagger.summary = 'Get genre by id'
  asyncHandler(GenreController.getGenresById)
);

router.use(protect);

router.route("/").post(
  // #swagger.tags = ['Genre']
  // #swagger.summary = 'Create genre'
  /* #swagger.security = [{
      "apiKeyAuth": [],
      "clientId": []
    }] 
  */
  asyncHandler(GenreController.createGenre)
);
router
  .route("/:id")
  .put(
    // #swagger.tags = ['Genre']
    // #swagger.summary = 'Update genre'
    /* #swagger.security = [{
          "apiKeyAuth": [],
          "clientId": []
        }] 
      */
    asyncHandler(GenreController.updateGenre)
  )
  .delete(
    // #swagger.tags = ['Genre']
    // #swagger.summary = 'Delete genre'
    /* #swagger.security = [{
        "apiKeyAuth": [],
        "clientId": []
      }] 
    */
    asyncHandler(GenreController.deleteGenre)
  );

module.exports = router;
