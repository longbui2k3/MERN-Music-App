const authorModel = require("../models/authorModel");

exports.getAllAuthors = async (req, res, next) => {
  try {
    const authors = await authorModel.find();
    res.status(200).json({
      status: "success",
      authors,
    });
  } catch (err) {
    return next(err);
  }
};

exports.getAuthor = async (req, res, next) => {
  try {
    const author = await authorModel.findById(req.params.id);

    res.status(200).json({
      status: "success",
      author,
    });
  } catch (err) {
    return next(err);
  }
};

exports.createAuthor = async (req, res, next) => {
  try {
    const newAuthor = await authorModel.create(req.body);

    res.status(201).json({
      status: "success",
      author: newAuthor,
    });
  } catch (err) {
    return next(err);
  }
};

exports.updateAuthor = async (req, res, next) => {
  try {
    const updatedAuthor = await authorModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: "success",
      author: updatedAuthor,
    });
  } catch (err) {
    return next(err);
  }
};

exports.deleteAuthor = async (req, res, next) => {
  try {
    await authorModel.findByIdAndDelete(req.params.id, req.body);

    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    return next(err);
  }
};
