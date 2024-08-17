"use strict";
const jwt = require("jsonwebtoken");
const { AuthFailureError, ForbiddenError, NotFoundError } = require("../core/errorResponse");
const asyncHandler = require("../helpers/asyncHandler");
const { generateToken } = require("../configs");
const KeytokenService = require("../services/KeytokenService");
const HEADER = {
  API_KEY: "x-api-key",
  CLIENT_ID: "x-client-id",
  AUTHORIZATION: "authorization",
  REFRESHTOKEN: "x-rtoken-id",
};
const protect = asyncHandler(async (req, res, next) => {
  const userId = req.headers[HEADER.CLIENT_ID];
  if (!userId) {
    throw new AuthFailureError("Invalid Request!");
  }
  const keyStore = await KeytokenService.findByUserId(userId);
  if (!keyStore) {
    throw new NotFoundError("Not Found KeyStore!");
  }

  if (req.headers[HEADER.REFRESHTOKEN]) {
    const refreshToken = req.headers[HEADER.REFRESHTOKEN];
    if (!refreshToken) {
      throw new AuthFailureError("Invalid Request!");
    }
    try {
      const decodeUser = jwt.verify(refreshToken, keyStore.privateKey);
      if (userId !== decodeUser.userId) {
        throw new AuthFailureError("Invalid UserId");
      }
      req.keyStore = keyStore;
      req.user = decodeUser;
      req.refreshToken = refreshToken;
      return next();
    } catch (error) {
      throw error;
    }
  }

  const accessToken = req.headers[HEADER.AUTHORIZATION];
  if (!accessToken) {
    throw new AuthFailureError("Invalid Request!");
  }

  try {
    const decodeUser = jwt.verify(accessToken, keyStore.publicKey);
    if (userId !== decodeUser.userId) {
      throw new AuthFailureError("Invalid UserId");
    }
    req.keyStore = keyStore;
    req.user = decodeUser;
    return next();
  } catch (error) {
    throw error;
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

const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    const accessToken = await generateToken(payload, publicKey, "2 days");
    const refreshToken = await generateToken(payload, privateKey, "7 days");

    return { accessToken, refreshToken };
  } catch (error) {
    throw new AuthFailureError("Something went wrong!");
  }
};

module.exports = { protect, restrictTo, getMe, createTokenPair };
