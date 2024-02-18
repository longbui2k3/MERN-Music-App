"use strict";

const { OK, CREATED } = require("../core/successResponse");
const UserService = require("../services/UserService");

class UserController {
  static getUserById = async (req, res, next) => {
    const user = await UserService.getUserById({ id: req.params.id });
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
      userId: req.user.id,
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

  
}
module.exports = UserController;
