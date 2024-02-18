"use strict";

const { CREATED, SuccessResponse, OK } = require("../core/successResponse");
const AuthenService = require("../services/AuthenService");

class AuthenController {
  static signUp = async (req, res, next) => {
    const { type, token, user } = await AuthenService.signUp(req.body);
    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 1000
      ),
      secure: true,
      httpOnly: true,
    };
    res.cookie("jwt", token, cookieOptions);
    new CREATED({
      message: `${type} successfully!`,
      metadata: { token, user },
    }).send(res);
  };
  static forgotPassword = async (req, res, next) => {
    await AuthenService.forgotPassword(req.body);
    new OK({ message: "Password reset email sent" }).send(res);
  };
  static resetPassword = async (req, res, next) => {
    const { password, passwordConfirm } = req.body;
    const tokenParams = req.params.token;
    const { type, token, user } = await AuthenService.resetPassword({
      password,
      passwordConfirm,
      token: tokenParams,
    });
    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 1000
      ),
      secure: true,
      httpOnly: true,
    };
    res.cookie("jwt", token, cookieOptions);
    new OK({
      message: `${type} successfully!`,
      metadata: { token, user },
    }).send(res);
  };

  static logIn = async (req, res, next) => {
    const { type, token, user } = await AuthenService.logIn(
      req.query.type,
      req.body
    );
    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 1000
      ),
      secure: true,
      httpOnly: true,
    };
    res.cookie("jwt", token, cookieOptions);
    new OK({
      message: `${type} successfully!`,
      metadata: { token, user },
    }).send(res);
  };
  static logOut = async (req, res, next) => {
    res.cookie("jwt", "", {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });

    new OK({
      message: "Logged out successfully!",
    }).send(res);
  };
  static checkExistEmail = async (req, res, next) => {
    await AuthenService.checkExistEmail(req.body);
    new OK({}).send(res);
  };
}

module.exports = AuthenController;
