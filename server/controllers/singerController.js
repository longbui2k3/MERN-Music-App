const singerModel = require("../models/singerModel");

exports.getAllSingers = async (req, res, next) => {
  try {
    const singers = await singerModel.find();

    res.status(200).json({
      status: "success",
      singers,
    });
  } catch (err) {
    return next(err);
  }
};

exports.getSinger = async (req, res, next) => {
  try {
    const singer = await singerModel.findById(req.params.id);

    res.status(200).json({
      status: "success",
      singer,
    });
  } catch (err) {
    return next(err);
  }
};

exports.createSinger = async (req, res, next) => {
  try {
    const newSinger = await singerModel.create(req.body);

    res.status(201).json({
      status: "success",
      singer: newSinger,
    });
  } catch (err) {
    return next(err);
  }
};

exports.updateSinger = async (req, res, next) => {
  try {
    const updatedSinger = await singerModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: "success",
      singer: updatedSinger,
    });
  } catch (err) {
    return next(err);
  }
};

exports.deleteSinger = async (req, res, next) => {
  try {
    await singerModel.findByIdAndDelete(req.params.id, req.body);

    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    return next(err);
  }
};

