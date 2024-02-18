"use strict";
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
require("dotenv").config();
const { generateToken } = require("../configs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const admin = require("firebase-admin");
const firebaseConfig = require("../configs/firebase");
const { BadRequestError, AuthFailureError } = require("../core/errorResponse");
const { findByEmail } = require("../models/repo/user.repo");
const sendResetEmail = require("../helpers/sendResetEmail");
const MusicListFactory = require("./MusicListService");
const { startSession } = require("mongoose");
admin.initializeApp(firebaseConfig);

class AuthenService {
  createSendToken(type, user) {
    const token = generateToken(user._id);
    user.password = undefined;
    return { type, token, user };
  }
  async signUpNormal({
    name,
    email,
    password,
    gender,
    dateOfBirth,
    typeOfAccount,
  }) {
    if (
      !name ||
      !email ||
      !password ||
      !gender ||
      !dateOfBirth ||
      !typeOfAccount
    ) {
      throw new BadRequestError("Please Enter all the Feilds");
    }

    const session = await startSession();
    session.startTransaction();
    const userExists = await findByEmail({
      email,
    });

    if (userExists) {
      throw new BadRequestError("User already exists!");
    }

    const user = await User.create({
      name,
      email,
      password,
      gender,
      dateOfBirth,
      typeOfAccount,
    });

    if (!user) {
      throw new BadRequestError("Create user unsuccessfully!");
    }

    const likedSongs = await MusicListFactory.createMusicList({
      type: "LikedSongs",
      userId: user._id,
    });

    if (!likedSongs) {
      throw new BadRequestError("Create user unsuccessfully!");
    }

    await session.commitTransaction();
    session.endSession();

    return this.createSendToken("Sign up", user);
  }
  async signUpAuth({
    name,
    uid,
    email,
    gender,
    dateOfBirth,
    avatar,
    typeOfAccount,
    federatedId,
  }) {
    if (
      !name ||
      !email ||
      !uid ||
      !gender ||
      !dateOfBirth ||
      !typeOfAccount ||
      (!federatedId && typeOfAccount === "facebook")
    ) {
      throw new BadRequestError("Please Enter all the Feilds");
    }

    const session = await startSession();
    session.startTransaction();

    const userExists = await findByEmail({
      email,
    });

    if (userExists) {
      throw new BadRequestError("User already exists!");
    }

    const user = await User.create({
      name,
      email,
      uid,
      gender,
      dateOfBirth,
      avatar,
      federatedId,
      typeOfAccount,
    });

    if (!user) {
      throw new BadRequestError("Create user unsuccessfully!");
    }

    const likedSongs = await MusicListFactory.createMusicList({
      type: "LikedSongs",
      userId: user._id,
    });

    if (!likedSongs) {
      throw new BadRequestError("Create user unsuccessfully!");
    }
    await session.commitTransaction();
    session.endSession();

    return this.createSendToken("Sign up", user);
  }
  async signUp({
    name,
    email,
    password,
    gender,
    dateOfBirth,
    typeOfAccount,
    uid,
    avatar,
    federatedId,
  }) {
    if (typeOfAccount === "normal") {
      return await this.signUpNormal({
        name,
        email,
        password,
        gender,
        dateOfBirth,
        typeOfAccount,
      });
    } else {
      return await this.signUpAuth({
        name,
        uid,
        email,
        gender,
        dateOfBirth,
        avatar,
        typeOfAccount,
        federatedId,
      });
    }
  }
  async forgotPassword({ email }) {
    if (!email) {
      throw new BadRequestError("Please Enter all the Feilds");
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new BadRequestError("No account with the supplied email exists!");
    }
    sendResetEmail(user);
  }
  async resetPassword({ password, passwordConfirm, token }) {
    if (password !== passwordConfirm) {
      throw new BadRequestError(
        "The password and its password confirm does not match!"
      );
    }
    const users = await User.find({}).select("+resetToken");
    let resetedUser = null;
    for (let user of users) {
      if (user.resetToken) {
        const confirm = await bcrypt.compare(token, user.resetToken);
        if (confirm) {
          resetedUser = user;
          break;
        }
      }
    }

    if (!resetedUser) {
      throw new AuthFailureError(
        "Unable to reset password due to user is not found!"
      );
    }

    resetedUser.password = password;
    resetedUser.resetToken = undefined;
    resetedUser.createAt = undefined;
    resetedUser.expireAt = undefined;
    await resetedUser.save({ validateBeforeSave: false });
    return this.createSendToken("Reset password", resetedUser);
  }
  async logIn(type, body) {
    if (type === "google") return await this.logInGoogle(body);
    else if (type === "facebook") return await this.logInFacebook(body);
    else return await this.logInNormal(body);
  }
  async logInNormal({ email, password }) {
    if (!email || !password) {
      throw new BadRequestError("Please provide email or password!");
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.matchPassword(password))) {
      throw new AuthFailureError("Incorrect email or password!");
    }
    return this.createSendToken("Log in", user);
  }
  async logInGoogle({ authentication, email }) {
    try {
      const decodedToken = await admin.auth().verifyIdToken(authentication);
      const user = await User.findOne({ email }).select("+uid");
      if (!user || !(await user.matchUid(decodedToken.uid, user.uid))) {
        throw new AuthFailureError(
          "Your Google account does not connect to app. Please sign up!"
        );
      }
      return this.createSendToken("Log in", user);
    } catch (err) {
      throw new AuthFailureError("Invalid ID Token!");
    }
  }
  async logInFacebook({ authentication, federatedId }) {
    try {
      const decodedToken = await admin.auth().verifyIdToken(authentication);
      const user = await User.findOne({ federatedId }).select("+uid");
      if (!user || !(await user.matchUid(decodedToken.uid, user.uid))) {
        throw new AuthFailureError(
          "Your Facebook account does not connect to app. Please sign up!"
        );
      }
      return this.createSendToken("Log in", user);
    } catch (err) {
      throw new AuthFailureError("Invalid ID Token!");
    }
  }
  async checkExistEmail({ email }) {
    const userExists = await User.findOne({ email });

    if (userExists) {
      throw new BadRequestError("Email has already existed!");
    }
  }
}

module.exports = new AuthenService();
