"use strict";
const {
  getAll,
  getById,
  getSingerByUser,
  create,
  update,
  deleteSinger,
  getAlbumByUser,
} = require("../models/repo/singer.repo");
class SingerService {
  async getAllSingers({ search }) {
    return await getAll({ search });
  }

  async getSinger({ id }) {
    return await getById({ id });
  }

  async getSingerByUser({ _id }) {
    return await getSingerByUser({ userId: _id });
  }

  async createSinger({ body }) {
    return await create({ data: body });
  }

  async updateSinger({ id, body }) {
    return await update({ id: id, data: body });
  }

  async deleteSinger({ id }) {
    await deleteSinger({ id });
  }

  async getAlbumBySinger({ id }) {
    return await getAlbumByUser({ id });
  }
}

module.exports = new SingerService();
