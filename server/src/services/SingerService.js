"use strict";
const { Types } = require("mongoose");
const { BadRequestError } = require("../core/errorResponse");
const Singer = require("../models/singerModel");
class SingerService {
  async getAllSingers({ search }) {
    return await Singer.find({ name: { $regex: search || "" } })
      .populate("songs")
      .populate("musicLists");
  }

  async getSinger({ id }) {
    const singer = await Singer.findById(id);
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
}

module.exports = new SingerService();
