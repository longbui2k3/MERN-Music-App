"use strict";
const { Types } = require("mongoose");
const { BadRequestError } = require("../core/errorResponse");
const Singer = require("../models/singerModel");
const songModel = require("../models/songModel");
class SingerService {
  async getAllSingers({ search }) {
    return await Singer.find({ name: { $regex: search || "" } })
      .populate("songs")
      .populate("musicLists");
  }

  async getSinger({ id }) {
    const singer = await Singer.findById(id)
      .populate("musicLists")
      .populate({ path: "songs", populate: "singers", strictPopulate: false })
      .exec();
    if (!singer) {
      throw new BadRequestError("Singer with this id is not found!");
    }
    return singer;
  }

  async getSingerByUser({ _id }) {
    const singer = await Singer.findOne({ user: new Types.ObjectId(_id) })
      .populate({ path: "songs", populate: "singers" })
      .populate({ path: "musicLists", populate: "musiclist_attributes" });
    if (!singer) {
      throw new BadRequestError("Singer with this user is not found!");
    }
    return singer;
  }

  async createSinger({ body }) {
    const newSinger = await Singer.create(body);
    if (!newSinger) {
      throw new BadRequestError("Create singer unsuccessfully!");
    }
    return newSinger;
  }
  async updateSinger({ id, body }) {
    const updatedSinger = await Singer.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!updatedSinger) {
      throw new BadRequestError("Update singer unsuccessfully!");
    }

    return updatedSinger;
  }

  async deleteSinger({ id }) {
    await Singer.findByIdAndDelete(id);
  }

  async getAlbumBySinger({ id }) {
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
    return singer.musicLists;
  }
}

module.exports = new SingerService();
