const express = require("express");
const singerController = require("../controllers/singerController");
const authenController = require("../controllers/authenController");
const router = express.Router();

router
  .route("/")
  .get(singerController.getAllSingers)
  .post(
    authenController.protect,
    authenController.restrictTo("admin"),
    singerController.createSinger
  );

router
  .route("/:id")
  .get(singerController.getSinger)
  .patch(
    authenController.protect,
    authenController.restrictTo("admin"),
    singerController.updateSinger
  )
  .delete(
    authenController.protect,
    authenController.restrictTo("admin"),
    singerController.deleteSinger
  );
module.exports = router;
