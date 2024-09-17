const { Types } = require("mongoose");
const Singer = require("../singerModel");
const {
  BadRequestError,
  FailedDependencyError,
  NotFoundError,
} = require("../../core/errorResponse");
const songModel = require("../songModel");
const { removeUndefinedInObject } = require("../../utils");
const { FolderMusicList } = require("../folderModel");

const getAll = async ({ search }) => {
  return await Singer.find({ name: { $regex: search || "" } })
    .populate("songs")
    .populate("musicLists");
};

const getById = async ({ id }) => {
  const singer = await Singer.findById(id)
    .populate("musicLists")
    .populate({ path: "songs", populate: "singers", strictPopulate: false })
    .exec();

  if (!singer) {
    throw new NotFoundError("Singer with this id is not found!");
  }

  return singer;
};

const getSingerByUser = async ({ userId }) => {
  const singer = await Singer.findOne({ user: new Types.ObjectId(userId) })
    .populate({ path: "songs", populate: "singers" })
    .populate({ path: "musicLists", populate: "musiclist_attributes" });
  if (!singer) {
    throw new BadRequestError("Singer with this user is not found!");
  }
  return singer;
};

const create = async ({ data }) => {
  const newSinger = await Singer.create(data);
  if (!newSinger) {
    throw new BadRequestError("Create singer unsuccessfully!");
  }
  return newSinger;
};

const update = async ({ id, data }) => {
  const updatedSinger = await Singer.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!updatedSinger) {
    throw new BadRequestError("Update singer unsuccessfully!");
  }

  return updatedSinger;
};

const deleteSinger = async ({ id }) => {
  const singer = await Singer.findById(id);
  if (!singer) throw new NotFoundError("Singer with this user is not found!");
  await Singer.findByIdAndDelete(id);
};

const getAlbumByUser = async ({ id }) => {
  const singer = await Singer.findById(id)
    .populate({
      path: "musicLists",
      populate: {
        path: "musiclist_attributes",
        select: { name_embedding: 0 },
      },
      select: { name_embedding: 0, songs: 0 },
    })
    .populate()
    .select({ name_embedding: 0 })
    .lean();
  if (singer.musicLists != null && singer.musicLists.length > 0) {
    singer.musicLists = singer.musicLists.filter(
      (musicList) => musicList.type === "Album"
    );
    singer.musicLists = await Promise.all(
      singer.musicLists.map(async (musicList) => {
        musicList.songs = await songModel
          .find({ album: musicList._id })
          .select({ name_embedding: 0 });
        return musicList;
      })
    );
  }

  return singer.musicLists;
};

module.exports = {
  getAll,
  getById,
  getSingerByUser,
  create,
  update,
  deleteSinger,
  getAlbumByUser,
};
