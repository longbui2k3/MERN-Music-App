"use strict";
const { BadRequestError } = require("../core/errorResponse");
const Section = require("../models/sectionModel");
class SectionService {
  async getAllSection() {
    const sections = await Section.find()
      .populate({
        path: "musicLists",
        populate: {
          path: "musiclist_attributes",
          strictPopulate: false,
        },
        strictPopulate: false,
      })
      .exec();
    return sections;
  }
  async getSectionById(id) {
    const section = await Section.findById(id)
      .populate({ path: "musicLists", strictPopulate: false })
      .exec();
    if (!section) throw new BadRequestError(`Section with id: ${id} not found`);

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
}

module.exports = new SectionService();
