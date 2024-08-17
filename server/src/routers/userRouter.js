const express = require("express");
const UserController = require("../controllers/UserController");
const asyncHandler = require("../helpers/asyncHandler");
const { protect, getMe } = require("../auth/authUtils");

const router = express.Router();

router.use(protect);
router.route("/musiclists").get(
  // #swagger.tags = ['User']
  // #swagger.summary = 'Get musiclists by user id'
  /* #swagger.security = [{
          "apiKeyAuth": [],
          "clientId": []
        }] 
      */
  asyncHandler(UserController.getMusicListsByUserId)
);
router.route("/items").get(
  // #swagger.tags = ['User']
  // #swagger.summary = 'Get items by user id'
  /* #swagger.security = [{
          "apiKeyAuth": [],
          "clientId": []
        }] 
      */
  asyncHandler(UserController.getItemsByUserId)
);
router.route("/me").get(
  getMe,
  // #swagger.tags = ['User']
  // #swagger.summary = 'Get user by user id'
  /* #swagger.security = [{
          "apiKeyAuth": [],
          "clientId": []
        }] 
      */
  asyncHandler(UserController.getUserById)
);
router.route("/newInfo").get(
  // #swagger.tags = ['User']
  // #swagger.summary = 'Get new info from followed singers'
  /* #swagger.security = [{
          "apiKeyAuth": [],
          "clientId": []
        }] 
      */
  asyncHandler(UserController.getNewInfoFromFollowedSingers)
);
// router
//   .route("/likedsongs")
//   .post(asyncHandler(UserController.addSongToLikedSongs));
router.route("/favorite").post(
  // #swagger.tags = ['User']
  // #swagger.summary = 'Add favorite musiclist'
  /* #swagger.security = [{
          "apiKeyAuth": [],
          "clientId": []
        }] 
      */
  asyncHandler(UserController.addFavoriteMusicList)
);
router.route("/favorite/:musicList").delete(
  // #swagger.tags = ['User']
  // #swagger.summary = 'Remove favorite musiclist'
  /* #swagger.security = [{
          "apiKeyAuth": [],
          "clientId": []
        }] 
      */
  asyncHandler(UserController.removeFavoriteMusicList)
);
router.route("/follow").post(
  // #swagger.tags = ['User']
  // #swagger.summary = 'Follow singer'
  /* #swagger.security = [{
          "apiKeyAuth": [],
          "clientId": []
        }] 
      */
  asyncHandler(UserController.followSinger)
);
router.route("/follow/:singer").delete(
  // #swagger.tags = ['User']
  // #swagger.summary = 'Unfollow singer'
  /* #swagger.security = [{
          "apiKeyAuth": [],
          "clientId": []
        }] 
      */
  asyncHandler(UserController.unfollowSinger)
);
module.exports = router;
