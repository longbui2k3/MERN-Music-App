const express = require("express");
const authorController = require("../controllers/authorController");
const authenController = require("../controllers/authenController");
const router = express.Router();

router
  .route("/")
  .get(authorController.getAllAuthors)
  .post(
    authenController.protect,
    authenController.restrictTo("admin"),
    authorController.createAuthor
  );

router
  .route("/:id")
  .get(authorController.getAuthor)
  .patch(
    authenController.protect,
    authenController.restrictTo("admin"),
    authorController.updateAuthor
  )
  .delete(
    authenController.protect,
    authenController.restrictTo("admin"),
    authorController.deleteAuthor
  );

module.exports = router;
