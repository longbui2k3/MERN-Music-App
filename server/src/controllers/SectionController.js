"use strict";

const { OK, CREATED } = require("../core/successResponse");
const SectionService = require("../services/SectionService");

class SectionController {
  static getAllSection = async (req, res, next) => {
    const sections = await SectionService.getAllSection();
    new OK({
      message: "Get sections successfully!",
      metadata: {
        sections,
      },
    }).send(res);
  };
  static getSectionById = async (req, res, next) => {
    const section = await SectionService.getSectionById(req.params.sectionId);
    new OK({
      message: "Get section by id successfully!",
      metadata: {
        section,
      },
    }).send(res);
  };
  static getSectionOfAdmin = async (req, res, next) => {
    const sections = await SectionService.getSectionOfAdmin();

    new OK({
      message: "Get section of admin successfully!",
      metadata: {
        sections,
      },
    }).send(res);
  };
  static createSection = async (req, res, next) => {
    const section = await SectionService.createSection(req.body);
    new CREATED({
      message: "Create section successfully!",
      metadata: {
        section,
      },
    }).send(res);
  };

  static updateSection = async (req, res, next) => {
    const section = await SectionService.updateSection({
      id: req.params.sectionId,
      body: req.body,
    });
    new OK({
      message: "Update section successfully!",
      metadata: {
        section,
      },
    }).send(res);
  };
  static deleteSection = async (req, res, next) => {
    const section = await SectionService.deleteSection(req.params.sectionId);
    new OK({
      message: "Delete section successfully!",
      metadata: {
        section,
      },
    }).send(res);
  };
  static addMusiclistToLists = async (req, res, next) => {
    const section = await SectionService.addMusiclistToLists({
      musiclist_id: req.body.musiclist,
      section_id: req.body.section,
    });
    new OK({
      message: "Add musiclist to section successfully!",
      metadata: {
        section,
      },
    }).send(res);
  };
  static addSingerToLists = async (req, res, next) => {
    const section = await SectionService.addSingerToLists({
      singer_id: req.body.singer,
      section_id: req.body.section,
    });
    new OK({
      message: "Add singer to section successfully!",
      metadata: {
        section,
      },
    }).send(res);
  };
}
module.exports = SectionController;
