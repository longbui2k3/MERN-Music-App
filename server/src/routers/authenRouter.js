const express = require("express");
const AuthenController = require("../controllers/AuthenController");
const asyncHandler = require("../helpers/asyncHandler");
const { protect } = require("../auth/authUtils");

const router = express.Router();

router.post("/signup", asyncHandler(AuthenController.signUp));
router
  .route("/forgotPassword")
  .post(asyncHandler(AuthenController.forgotPassword));
router
  .route("/resetPassword/:token")
  .patch(asyncHandler(AuthenController.resetPassword));
router
  .route("/checkExistEmail")
  .post(asyncHandler(AuthenController.checkExistEmail));
router.route("/login").post(asyncHandler(AuthenController.logIn));
router.use(protect);
router.route("/logout").get(asyncHandler(AuthenController.logOut));
module.exports = router;
