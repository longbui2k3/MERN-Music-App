"use strict";

const { OK, CREATED } = require("../core/successResponse");
const UserService = require("../services/UserService");

class UserController {
  static getUserById = async (req, res, next) => {
    const user = await UserService.getUserById({ id: req.user.userId });
    new OK({
      message: "Get user by ID successfully!",
      metadata: {
        user,
      },
    }).send(res);
  };
  static addFavoriteMusicList = async (req, res, next) => {
    const user = await UserService.addFavoriteMusicList({
      user: req.user,
      musicListId: req.body.musicList,
    });
    new CREATED({
      message: "Add to favorite successfully!",
      metadata: {
        user,
      },
    }).send(res);
  };
  static removeFavoriteMusicList = async (req, res, next) => {
    const user = await UserService.removeFavoriteMusicList({
      user: req.user,
      musicListId: req.params.musicList,
    });
    new OK({
      message: "Remove to favorite successfully!",
      metadata: {
        user,
      },
    }).send(res);
  };

  static getMusicListsByUserId = async (req, res, next) => {
    const musicLists = await UserService.getMusicListsByUserId({
      userId: req.user.userId,
      musiclist_type: req.query.musiclist_type,
      search: req.query.search,
    });
    new OK({
      message: `Get ${
        req.query.musiclist_type ? req.query.musiclist_type : "musiclists"
      } successfully!`,
      metadata: {
        musicLists,
      },
    }).send(res);
  };
  static getItemsByUserId = async (req, res, next) => {
    const result = await UserService.getItemsByUserId({
      userId: req.user.userId,
      type: req.query.type,
      sort: req.query.sort
    });
    new OK({
      message: `Get items successfully!`,
      metadata: {
        items: result.items,
        lengthOfPlaylists: result.lengthOfPlaylists,
      },
    }).send(res);
  };
  static followSinger = async (req, res, next) => {
    const user = await UserService.followSinger({
      user: req.user,
      singerId: req.body.singer,
    });
    new CREATED({
      message: "Follow to singer successfully!",
      metadata: {
        user,
      },
    }).send(res);
  };
  static unfollowSinger = async (req, res, next) => {
    const user = await UserService.unfollowSinger({
      user: req.user,
      singerId: req.params.singer,
    });
    new OK({
      message: "Unfollow to singer successfully!",
      metadata: {
        user,
      },
    }).send(res);
  };
  static getNewInfoFromFollowedSingers = async (req, res, next) => {
    const newInfo = await UserService.getNewInfoFromFollowSinger({
      userId: req.user.userId,
    });

    new OK({
      message: "Get new info of followed singers successfully",
      metadata: {
        newInfo,
      },
    }).send(res);
  };
}
module.exports = UserController;
