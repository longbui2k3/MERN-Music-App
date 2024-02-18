"use strict";
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { AuthFailureError, ForbiddenError } = require("../core/errorResponse");
const asyncHandler = require("../helpers/asyncHandler");
const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    throw new AuthFailureError(
      "You are not logged in! Please log in to get access."
    );
  }
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ _id: decoded.id });

    if (!user) {
      throw new AuthFailureError(
        "The user belonging to this token does no longer exist."
      );
    }
    req.user = user;
    next();
  } catch (err) {
    throw new AuthFailureError("Invalid token!");
  }
});

const restrictTo = asyncHandler((...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new ForbiddenError(
        "You do not have permission to perform this action"
      );
    }

    next();
  };
});

const getMe = (req, res, next) => {
  try {
    req.params.id = req.user.id;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { protect, restrictTo, getMe };
