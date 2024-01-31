const express = require("express");
const singerController = require("../controllers/singerController");
const authenController = require("../controllers/authenController");
const router = express.Router();

router.use(authenController.protect);

router
  .route("/songs")
  .get(authenController.restrictTo("artist"), singerController.getSingerByUser);
router
  .route("/")
  .get(singerController.getAllSingers)
  .post(
  // authenController.restrictTo("admin"), 
  singerController.createSinger);

router
  .route("/:id")
  .get(singerController.getSinger)
  .patch(authenController.restrictTo("admin"), singerController.updateSinger)
  .delete(authenController.restrictTo("admin"), singerController.deleteSinger);
module.exports = router;
