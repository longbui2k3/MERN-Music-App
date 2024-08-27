"use strict";

const { BadRequestError, AuthFailureError } = require("../core/errorResponse");
const {
  getUser,
  isFavoriteMusicListExisted,
  updateUser,
  getMusicListsByUserId,
  getItemsByUserId,
  getUserWithAllInfo,
  isFollowingSinger,
  getAllFollowedSingers,
  getNewInfoFromFollowedSingers,
} = require("../models/repo/user.repo");

class UserService {
  getUserById = async ({ id }) => {
    return await getUser({ id });
  };

  addFavoriteMusicList = async ({ user, musicListId }) => {
    if (!user) {
      throw new AuthFailureError(
        "Can not add your favorite list because you are not logged in!"
      );
    }

    const checkExistsFavoriteMusicList = await isFavoriteMusicListExisted({
      userId: user.userId,
      musicListId,
    });

    if (checkExistsFavoriteMusicList) {
      throw new BadRequestError("Added to favorite list already!");
    }

    const updatedUser = await updateUser({
      userId: user.userId,
      updatedInfo: {
        $push: {
          musicLists: {
            musicList: musicListId,
            dateAdded: Date.now(),
            datePlayed: Date.now(),
          },
        },
      },
      options: { new: true },
    });

    return updatedUser;
  };

  removeFavoriteMusicList = async ({ user, musicListId }) => {
    if (!user) {
      throw new AuthFailureError(
        "Can not remove your favorite list because you are not logged in!"
      );
    }

    const checkExistsFavoriteMusicList = await isFavoriteMusicListExisted({
      userId: user.userId,
      musicListId,
    });

    if (!checkExistsFavoriteMusicList) {
      throw new BadRequestError("Music List is not in your favorite list!");
    }

    const updatedUser = await updateUser({
      userId: user.userId,
      updatedInfo: {
        $pull: { musicLists: { musicList: musicListId } },
      },
      options: { new: true },
    });

    return updatedUser;
  };

  getMusicListsOfUser = async ({ userId, musiclist_type, search }) => {
    return getMusicListsByUserId({ userId, musiclist_type, search });
  };

  getItemsOfUser = async ({ userId, type, sort = "recents" }) => {
    let user = await getUserWithAllInfo({ id: userId });
    if (!user) {
      throw new BadRequestError(`User with id: ${userId} not found`);
    }

    return await getItemsByUserId({ user, type, sort });
  };

  followSinger = async ({ user, singerId }) => {
    if (!user) {
      throw new AuthFailureError(
        "Can not add your favorite list because you are not logged in!"
      );
    }
    const checkExistsFollowSinger = await isFollowingSinger({
      id: user.userId,
      singerId,
    });

    if (checkExistsFollowSinger) {
      throw new BadRequestError("Followed to singer already!");
    }

    const updatedUser = await updateUser({
      userId: user.userId,
      updatedInfo: {
        $push: {
          singers: {
            singer: singerId,
            dateAdded: Date.now(),
            datePlayed: Date.now(),
          },
        },
      },
      options: { new: true },
    });

    return updatedUser;
  };

  unfollowSinger = async ({ user, singerId }) => {
    if (!user) {
      throw new AuthFailureError(
        "Can not remove your favorite list because you are not logged in!"
      );
    }

    const checkExistsFollowSinger = await isFollowingSinger({
      id: user.userId,
      singerId,
    });

    if (!checkExistsFollowSinger) {
      throw new BadRequestError("Singer hasn't been followed!");
    }

    const updatedUser = await updateUser({
      userId: user.userId,
      updatedInfo: {
        $pull: { singers: { singer: singerId } },
      },
      options: { new: true },
    });

    return updatedUser;
  };

  getNewInfoFromFollowSinger = async ({ userId }) => {
    // get all followed singers
    const userHasFollowedSingers = await getAllFollowedSingers({ id: userId });

    if (!userHasFollowedSingers) {
      throw new BadRequestError(
        "User is not found or does not follow any singers"
      );
    }

    //get new info
    return await getNewInfoFromFollowedSingers({
      user: userHasFollowedSingers,
    });
  };
}

module.exports = new UserService();
