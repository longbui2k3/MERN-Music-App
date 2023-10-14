const express = require("express");
const singerController = require("../controllers/singerController");
const router = express.Router();

router
  .route("/")
  .get(singerController.getAllSingers)
  .post(singerController.createSinger);

router
  .route("/:id")
  .get(singerController.getSinger)
  .patch(singerController.updateSinger)
  .delete(singerController.deleteSinger);
module.exports = router;
