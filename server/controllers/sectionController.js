const Section = require("../models/sectionModel");

exports.getAllSection = async (req, res, next) => {
  try {
    const sections = await Section.find().populate("listSongs").exec();

    res.status(200).json({
      status: "success",
      sections,
    });
  } catch (err) {
    next(err);
  }
};

exports.getSectionById = async (req, res, next) => {
  try {
    const sectionId = req.params.sectionId;
    const section = await Section.findById(sectionId)
      .populate("listSongs")
      .exec();
    if (!section) throw new Error(`Section with id: ${sectionId} not found`);

    res.status(200).json({
      status: "success",
      section,
    });
  } catch (err) {
    next(err);
  }
};

exports.createSection = async (req, res, next) => {
  try {
    const section = await Section.create(req.body);

    res.status(201).json({
      status: "success",
      section,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateSection = async (req, res, next) => {
  try {
    const sectionId = req.params.sectionId;
    const updatedSection = await Section.findOneAndUpdate(
      {
        _id: sectionId,
      },
      req.body
    );
    if (!updatedSection)
      throw new Error(`Section with id: ${sectionId} not found`);

    res.status(204);
  } catch (err) {
    next(err);
  }
};

exports.deleteSection = async (req, res, next) => {
  try {
    const sectionId = req.params.sectionId;
    const updatedSection = await Section.findByIdAndDelete(sectionId);
    if (!updatedSection)
      throw new Error(`Section with id: ${sectionId} not found`);

    res.status(204);
  } catch (err) {
    next(err);
  }
};
