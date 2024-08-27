const { Types } = require("mongoose");
const User = require("../userModel");
const {
  BadRequestError,
  FailedDependencyError,
} = require("../../core/errorResponse");
const { removeUndefinedInObject } = require("../../utils");
const { FolderMusicList } = require("../folderModel");

const findByEmail = async ({ email }) => {
  return await User.findOne({ email });
};

const getUser = async ({ id }) => {
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
  user["items"] = [...(user["musicLists"] || []), ...(user["singers"] || [])];
  return user;
};

const getUserWithAllInfo = async ({ id }) => {
  const user = await User.findOne({ _id: id });

  if (!user) {
    throw new BadRequestError("Invalid ID!");
  }

  return user;
};

const isFavoriteMusicListExisted = async ({ userId, musicListId }) => {
  return await User.findOne({
    _id: userId,
    musicLists: { $elemMatch: { musicList: musicListId } },
  });
};

const updateUser = async ({ userId, updatedInfo, options }) => {
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    updatedInfo,
    options
  );

  if (!updatedUser) {
    throw new FailedDependencyError("Something error!");
  }
  return updatedUser;
};

const getMusicListsByUserId = async ({ userId, musiclist_type, search }) => {
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

const getItemsByUserId = async ({ user, type, sort }) => {
  const agg = [
    {
      $match: {
        _id: new Types.ObjectId(user._id),
      },
    },
  ];
  if (user.singers && user.singers.length !== 0) {
    agg.push({ $unwind: "$singers" });
    agg.push({
      $addFields: {
        "singers.type": "singers",
      },
    });
    agg.push({
      $lookup: {
        from: "singers",
        localField: "singers.singer",
        foreignField: "_id",
        as: "singers.singer",
      },
    });
    agg.push({ $unwind: "$singers.singer" });
  }
  if (user.musicLists && user.musicLists.length !== 0) {
    agg.push({
      $unwind: "$musicLists", // Unwind the musicLists array
    });
    agg.push({
      $addFields: {
        "musicLists.type": "musicLists",
      },
    });
    let pipeline = [
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
    ];
    agg.push({
      $lookup: {
        from: "musiclists",
        localField: "musicLists.musicList",
        foreignField: "_id",
        pipeline,
        as: "musicLists.musicList",
      },
    });
    agg.push({
      $unwind: "$musicLists.musicList",
    });
  }
  if (user.folders && user.folders.length !== 0) {
    agg.push({
      $unwind: "$folders",
    });

    agg.push({
      $lookup: {
        from: "folders",
        localField: "folders",
        foreignField: "_id",
        as: "folders",
      },
    });
    agg.push({
      $addFields: {
        "folders.type": "folders",
      },
    });
    agg.push({
      $unwind: "$folders",
    });
  }
  agg.push({
    $group: removeUndefinedInObject({
      _id: "$_id",
      musicLists:
        user.musicLists.length !== 0 ? { $addToSet: "$musicLists" } : undefined,
      singers:
        user.singers.length !== 0 ? { $addToSet: "$singers" } : undefined,
      folders:
        user.folders.length !== 0 ? { $addToSet: "$folders" } : undefined,
    }),
  });
  const concatArrays = [];
  if (user.musicLists.length) {
    concatArrays.push("$musicLists");
  }
  if (user.singers.length) {
    concatArrays.push("$singers");
  }
  if (user.folders.length) {
    concatArrays.push("$folders");
  }
  agg.push({
    $project: {
      items: { $concatArrays: concatArrays },
    },
  });

  user = await User.aggregate(agg);
  const types = ["Album", "Playlist"];
  let res;
  if (!user[0]) res = { items: [] };
  const items = user[0].items.filter((item) => item?.musicList?.type === type);

  if (type === "Artist") {
    res = { items: user[0].items.filter((item) => item.singer) };
  }
  const result = types.includes(type)
    ? items
    : user[0].items.sort((a, b) => (a.datePlayed > b.datePlayed ? -1 : 1));
  res = {
    items: result,
    lengthOfPlaylists:
      result.filter((item) => item?.musicList?.type === "Playlist").length +
      (await FolderMusicList.find({ user: user._id })).length,
  };

  if (sort === "recents") {
    res.items = res.items.sort((item1, item2) =>
      item1.datePlayed > item2.datePlayed ? -1 : 1
    );
  } else if (sort === "recentlyadded") {
    res.items = res.items.sort((item1, item2) =>
      item1.dateAdded > item2.dateAdded ? -1 : 1
    );
  } else if (sort === "alphabetical") {
    res.items = res.items.sort((item1, item2) => {
      let name1, name2;
      if (item1.type === "musicLists") {
        name1 = item1.musicList.name;
      } else if (item1.type === "singers") {
        name1 = item1.singer.name;
      } else {
        name1 = item1.name;
      }

      if (item2.type === "musicLists") {
        name2 = item2.musicList.name;
      } else if (item2.type === "singers") {
        name2 = item2.singer.name;
      } else {
        name2 = item2.name;
      }

      return name1.localeCompare(name2, undefined, { sensitivity: "base" });
    });
  } else if (sort === "creator") {
    let creator1, creator2;
    res.items = res.items.sort((item1, item2) => {
      if (item1.type === "musicLists") {
        if (item1.musicList.type === "Playlist") {
          creator1 = item1.musicList.musiclist_attributes.user._id.toString();
        } else if (item1.musicList.type === "Album") {
          creator1 = item1.musicList.musiclist_attributes.singers[0].name;
        }
      } else if (item1.type === "singers") {
        creator1 = item1.singer.name;
      } else {
        creator1 = item1.user.toString();
      }

      if (item2.type === "musicLists") {
        if (item2.musicList.type === "Playlist") {
          creator2 = item2.musicList.musiclist_attributes.user._id.toString();
        } else if (item2.musicList.type === "Album") {
          creator2 = item2.musicList.musiclist_attributes.singers[0].name;
        }
      } else if (item2.type === "singers") {
        creator2 = item2.singer.name;
      } else {
        creator2 = item2.user.toString();
      }
      return creator1.localeCompare(creator2, undefined, {
        sensitivity: "base",
      });
    });
  }

  return res;
};

const isFollowingSinger = async ({ id, singerId }) => {
  return await User.findOne({
    _id: id,
    singers: { $elemMatch: { singer: singerId } },
  });
};

const getAllFollowedSingers = async ({ id }) => {
  return await User.findOne({
    _id: id,
    singers: { $exists: true, $not: { $size: 0 } },
  }).populate("singers.singer");
};

const getNewInfoFromFollowedSingers = async ({ user }) => {
  var newInfoList = [];
  await Promise.all(
    user.singers.map(async (singer) => {
      let singerAlbums = await singer.singer.populate({
        path: "musicLists",
        populate: { path: "musiclist_attributes", populate: "singers" },
      });

      let albums = singerAlbums.musicLists;
      let mergedAlbums = [].concat.apply([], albums);

      const currentDate = new Date();
      const oneMonthAgoDate = new Date();
      oneMonthAgoDate.setMonth(oneMonthAgoDate.getMonth() - 1);

      const albumsInMonth = mergedAlbums.filter((item) => {
        return (
          item.musiclist_attributes.releasedDate &&
          new Date(item.musiclist_attributes.releasedDate) >= oneMonthAgoDate &&
          new Date(item.musiclist_attributes.releasedDate) <= currentDate
        );
      });
      newInfoList.push(...albumsInMonth);
    })
  );
  return newInfoList.sort(
    (a, b) =>
      b.musiclist_attributes.releasedDate - a.musiclist_attributes.releasedDate
  );
};

module.exports = {
  findByEmail,
  getUser,
  isFavoriteMusicListExisted,
  updateUser,
  getMusicListsByUserId,
  getItemsByUserId,
  getUserWithAllInfo,
  isFollowingSinger,
  getAllFollowedSingers,
  getNewInfoFromFollowedSingers,
};
