"use strict";
const { BadRequestError } = require("../core/errorResponse");
const Section = require("../models/sectionModel");
const { MusicList } = require("../models/musicListModel");
const Singer = require("../models/singerModel");
class SectionService {
  async getAllSection() {
    let sections = await Section.find()
      .populate({
        path: "musiclists",
        populate: {
          path: "musiclist_attributes",
          strictPopulate: false,
        },
        strictPopulate: false,
      })
      .populate({
        path: "singers",
        populate: {
          path: "musiclist_attributes",
          strictPopulate: false,
        },
        strictPopulate: false,
      })
      .lean();
    sections = sections.map((section) => {
      section["lists"] = [...section["musiclists"], ...section["singers"]];
      delete section["musiclists"];
      delete section["singers"];
      return section;
    });
    return sections;
  }
  async getSectionById(id) {
    let section = await Section.findById(id)
      .populate({
        path: "musiclists",
        populate: {
          path: "musiclist_attributes",
          strictPopulate: false,
        },
        strictPopulate: false,
      })
      .populate({
        path: "singers",
        populate: {
          path: "musiclist_attributes",
          strictPopulate: false,
        },
        strictPopulate: false,
      })
      .lean();

    if (!section) throw new BadRequestError(`Section with id: ${id} not found`);
    section["lists"] = [...section["musiclists"], ...section["singers"]];
    delete section["musiclists"];
    delete section["singers"];
    return section;
  }

  async getSectionOfAdmin() {
    const sections = await Section.find()
      .populate("musicLists")
      .populate("user")
      .exec();

    const sectionOfAdmin = sections.filter(
      (section) => section.user && section.user.role == "admin"
    );
    return sectionOfAdmin;
  }
  async createSection({ title, user }) {
    const section = await Section.create({ title, user });
    if (!section) {
      throw new BadRequestError("Create section unsuccessfully!");
    }
    return section;
  }
  async updateSection({ id, body }) {
    const updatedSection = await Section.findOneAndUpdate(
      {
        _id: id,
      },
      body,
      { new: true }
    );
    if (!updatedSection) {
      throw new BadRequestError("Update section unsuccessfully!");
    }

    return updatedSection;
  }

  async deleteSection(id) {
    await Section.findByIdAndDelete(id);
  }
  async addMusiclistToLists({ musiclist_id, section_id }) {
    const musiclist = await MusicList.findById(musiclist_id);
    if (!musiclist) {
      throw new BadRequestError(
        `Musiclist with id ${musiclist_id} is not found!`
      );
    }
    const section = await Section.findById(section_id);
    if (!section)
      throw new BadRequestError(`Section with id: ${section_id} not found`);

    const updatedSection = await Section.findByIdAndUpdate(
      section_id,
      {
        $addToSet: { lists: musiclist_id },
      },
      { new: true }
    );
    return updatedSection;
  }
  async addSingerToLists({ singer_id, section_id }) {
    const singer = await Singer.findById(singer_id);
    if (!singer) {
      throw new BadRequestError(`singer with id ${singer_id} is not found!`);
    }

    const section = await Section.findById(section_id);
    if (!section)
      throw new BadRequestError(`Section with id: ${section_id} not found`);

    const updatedSection = await Section.findByIdAndUpdate(
      section_id,
      {
        $addToSet: { lists: singer_id },
      },
      { new: true }
    );
    return updatedSection;
  }
}

module.exports = new SectionService();
