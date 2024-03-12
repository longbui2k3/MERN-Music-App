"use strict";

const { Types } = require("mongoose");
const { BadRequestError, AuthFailureError } = require("../core/errorResponse");
const User = require("../models/userModel");

class UserService {
  getUserById = async ({ id }) => {
    const user = await User.findById(id)
      .populate({
        path: "musicLists.musicList",
        populate: {
          path: "musiclist_attributes",
          populate: { path: "singers", strictPopulate: false },
        },
        strictPopulate: false,
      })
      .populate({
        path: "musicLists.musicList",
        populate: {
          path: "musiclist_attributes",
          populate: { path: "user", strictPopulate: false },
        },
        strictPopulate: false,
      })
      .populate({
        path: "singers.singer",
        strictPopulate: false,
      })
      .lean();
    if (!user) {
      throw new BadRequestError("Invalid ID!");
    }
    user["items"] = [...user["musicLists"], ...user["singers"]];
    return user;
  };
  addFavoriteMusicList = async ({ user, musicListId }) => {
    if (!user) {
      throw new AuthFailureError(
        "Can not add your favorite list because you are not logged in!"
      );
    }
    const checkExistsFavoriteMusicList = await User.findOne({
      _id: user._id,
      musicLists: { $elemMatch: { musicList: musicListId } },
    });
    if (checkExistsFavoriteMusicList) {
      throw new BadRequestError("Added to favorite list already!");
    }

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        $push: {
          musicLists: {
            musicList: musicListId,
            dateAdded: Date.now(),
            datePlayed: Date.now(),
          },
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      throw new FailedDependencyError("Something error!");
    }
    return updatedUser;
  };
  removeFavoriteMusicList = async ({ user, musicListId }) => {
    if (!user) {
      throw new AuthFailureError(
        "Can not remove your favorite list because you are not logged in!"
      );
    }

    const checkExistsFavoriteMusicList = await User.findOne({
      _id: user._id,
      musicLists: { $elemMatch: { musicList: musicListId } },
    });
    if (!checkExistsFavoriteMusicList) {
      throw new BadRequestError("Musiclist is not in your favorite list!");
    }
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        $pull: { musicLists: { musicList: musicListId } },
      },
      { new: true }
    );
    if (!updatedUser) {
      throw new FailedDependencyError("Something error!");
    }
    return updatedUser;
  };
  getMusicListsByUserId = async ({ userId, musiclist_type, search }) => {
    const user = await User.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(userId),
        },
      },
      {
        $unwind: "$musicLists", // Unwind the musicLists array
      },
      {
        $lookup: {
          from: "musiclists",
          localField: "musicLists.musicList",
          foreignField: "_id",
          pipeline: [
            {
              $lookup: {
                from: "albums",
                localField: "musiclist_attributes",
                foreignField: "_id",
                as: "musiclist_attributes_album",
                pipeline: [
                  {
                    $lookup: {
                      from: "singers",
                      localField: "singers",
                      foreignField: "_id",
                      as: "singers",
                    },
                  },
                ],
              },
            },
            {
              $lookup: {
                from: "playlists",
                localField: "musiclist_attributes",
                foreignField: "_id",
                as: "musiclist_attributes_playlist",
                pipeline: [
                  {
                    $lookup: {
                      from: "users",
                      localField: "user",
                      foreignField: "_id",
                      as: "user",
                    },
                  },
                  {
                    $project: {
                      user: {
                        $arrayElemAt: ["$user", 0],
                      },
                    },
                  },
                ],
              },
            },
            {
              $lookup: {
                from: "likedsongs",
                localField: "musiclist_attributes",
                foreignField: "_id",
                as: "musiclist_attributes_likedsongs",
                pipeline: [
                  {
                    $lookup: {
                      from: "users",
                      localField: "user",
                      foreignField: "_id",
                      as: "user",
                    },
                  },
                  {
                    $project: {
                      user: {
                        $arrayElemAt: ["$user", 0],
                      },
                    },
                  },
                ],
              },
            },
            {
              $project: {
                name: 1,
                type: 1,
                songs: 1,
                imageURL: 1,
                musiclist_attributes: {
                  $concatArrays: [
                    "$musiclist_attributes_album",
                    "$musiclist_attributes_playlist",
                    "$musiclist_attributes_likedsongs",
                  ],
                },
              },
            },
            {
              $unwind: "$musiclist_attributes",
            },
            {
              $match: {
                name: {
                  $regex: search || "",
                  $options: "i",
                },
              },
            },
          ],
          as: "musicLists.musicList",
        },
      },
      {
        $unwind: "$musicLists.musicList",
      },
      {
        $group: {
          _id: "$_id",
          musicLists: { $push: "$musicLists" },
        },
      },
    ]);

    if (!user) {
      throw new BadRequestError(`User with id: ${userId} not found`);
    }
    const types = ["Album", "Playlist", "LikedSongs"];
    if (!user[0]) return [];
    const musiclists = user[0].musicLists.filter(
      (item) => item.musicList.type === musiclist_type
    );

    return types.includes(musiclist_type) ? musiclists : user[0].musicLists;
  };
  getItemsByUserId = async ({ userId, musiclist_type, search }) => {
    const user = await User.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(userId),
        },
      },
      { $unwind: "$singers" },
      {
        $lookup: {
          from: "singers",
          localField: "singers.singer",
          foreignField: "_id",
          as: "singers.singer",
        },
      },
      { $unwind: "$singers.singer" },
      {
        $unwind: "$musicLists", // Unwind the musicLists array
      },
      {
        $lookup: {
          from: "musiclists",
          localField: "musicLists.musicList",
          foreignField: "_id",
          pipeline: [
            {
              $lookup: {
                from: "albums",
                localField: "musiclist_attributes",
                foreignField: "_id",
                as: "musiclist_attributes_album",
                pipeline: [
                  {
                    $lookup: {
                      from: "singers",
                      localField: "singers",
                      foreignField: "_id",
                      as: "singers",
                    },
                  },
                ],
              },
            },
            {
              $lookup: {
                from: "playlists",
                localField: "musiclist_attributes",
                foreignField: "_id",
                as: "musiclist_attributes_playlist",
                pipeline: [
                  {
                    $lookup: {
                      from: "users",
                      localField: "user",
                      foreignField: "_id",
                      as: "user",
                    },
                  },
                  {
                    $project: {
                      user: {
                        $arrayElemAt: ["$user", 0],
                      },
                    },
                  },
                ],
              },
            },
            {
              $lookup: {
                from: "likedsongs",
                localField: "musiclist_attributes",
                foreignField: "_id",
                as: "musiclist_attributes_likedsongs",
                pipeline: [
                  {
                    $lookup: {
                      from: "users",
                      localField: "user",
                      foreignField: "_id",
                      as: "user",
                    },
                  },
                  {
                    $project: {
                      user: {
                        $arrayElemAt: ["$user", 0],
                      },
                    },
                  },
                ],
              },
            },
            {
              $project: {
                name: 1,
                type: 1,
                songs: 1,
                imageURL: 1,
                musiclist_attributes: {
                  $concatArrays: [
                    "$musiclist_attributes_album",
                    "$musiclist_attributes_playlist",
                    "$musiclist_attributes_likedsongs",
                  ],
                },
              },
            },
            {
              $unwind: "$musiclist_attributes",
            },
            {
              $match: {
                name: {
                  $regex: search || "",
                  $options: "i",
                },
              },
            },
          ],
          as: "musicLists.musicList",
        },
      },
      {
        $unwind: "$musicLists.musicList",
      },
      {
        $group: {
          _id: "$_id",
          musicLists: { $push: "$musicLists" },
          singers: { $addToSet: "$singers" },
        },
      },
      {
        $project: {
          items: { $concatArrays: ["$musicLists", "$singers"] },
        },
      },
    ]);
    if (!user) {
      throw new BadRequestError(`User with id: ${userId} not found`);
    }
    const types = ["Album", "Playlist", "LikedSongs"];
    if (!user[0]) return [];
    const items = user[0].items.filter(
      (item) => item?.musicList?.type === musiclist_type
    );

    return types.includes(musiclist_type) ? items : user[0].items;
  };

  followSinger = async ({ user, singerId }) => {
    if (!user) {
      throw new AuthFailureError(
        "Can not add your favorite list because you are not logged in!"
      );
    }
    const checkExistsFollowSinger = await User.findOne({
      _id: user._id,
      singers: { $elemMatch: { singer: singerId } },
    });
    if (checkExistsFollowSinger) {
      throw new BadRequestError("Followed to singer already!");
    }

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        $push: {
          singers: {
            singer: singerId,
            dateAdded: Date.now(),
            datePlayed: Date.now(),
          },
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      throw new FailedDependencyError("Something error!");
    }
    return updatedUser;
  };

  unfollowSinger = async ({ user, singerId }) => {
    if (!user) {
      throw new AuthFailureError(
        "Can not remove your favorite list because you are not logged in!"
      );
    }

    const checkExistsFollowSinger = await User.findOne({
      _id: user._id,
      singers: { $elemMatch: { singer: singerId } },
    });
    if (!checkExistsFollowSinger) {
      throw new BadRequestError("Singer hasn't been followed!");
    }
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        $pull: { singers: { singer: singerId } },
      },
      { new: true }
    );
    if (!updatedUser) {
      throw new FailedDependencyError("Something error!");
    }
    return updatedUser;
  };
}

module.exports = new UserService();
