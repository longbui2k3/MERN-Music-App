const express = require("express");
const UserController = require("../controllers/UserController");
const asyncHandler = require("../helpers/asyncHandler");
const { protect, getMe } = require("../auth/authUtils");

const router = express.Router();

router.use(protect);
router
  .route("/musiclists")
  .get(asyncHandler(UserController.getMusicListsByUserId));
router.route("/me").get(getMe, asyncHandler(UserController.getUserById));
// router
//   .route("/likedsongs")
//   .post(asyncHandler(UserController.addSongToLikedSongs));
router
  .route("/favorite")
  .post(asyncHandler(UserController.addFavoriteMusicList));
router
  .route("/favorite/:musicList")
  .delete(asyncHandler(UserController.removeFavoriteMusicList));
module.exports = router;
