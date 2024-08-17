"use strict";

const { CREATED, OK } = require("../core/successResponse");
const AuthenService = require("../services/AuthenService");

class AuthenController {
  static signUp = async (req, res, next) => {
    const { type, tokens, user } = await AuthenService.signUp(req.body);
    new CREATED({
      message: `${type} successfully!`,
      metadata: { tokens, user },
    }).send(res);
  };
  static forgotPassword = async (req, res, next) => {
    await AuthenService.forgotPassword(req.body);
    new OK({ message: "Password reset email sent" }).send(res);
  };
  static resetPassword = async (req, res, next) => {
    const { password, passwordConfirm } = req.body;
    const tokenParams = req.params.token;
    console.log(tokenParams);
    const { type, tokens, user } = await AuthenService.resetPassword({
      password,
      passwordConfirm,
      token: tokenParams,
    });
    new OK({
      message: `${type} successfully!`,
      metadata: { tokens, user },
    }).send(res);
  };

  static logIn = async (req, res, next) => {
    const { type, tokens, user } = await AuthenService.logIn(
      req.query.type,
      req.body
    );
    new OK({
      message: `${type} successfully!`,
      metadata: { tokens, user },
    }).send(res);
  };
  static logOut = async (req, res, next) => {
    await AuthenService.logOut(req.keyStore);
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
