const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
require("dotenv").config();
const generateToken = require("../config/generateToken");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const admin = require("firebase-admin");
const firebaseConfig = {
  apiKey: "AIzaSyAz_-N20aKrjSmxtJsWJE3ylhC7dA-CX7s",
  authDomain: "auth-music-app.firebaseapp.com",
  projectId: "auth-music-app",
  storageBucket: "auth-music-app.appspot.com",
  messagingSenderId: "779072786560",
  appId: "1:779072786560:web:633111d0463bf129c85665",
};
admin.initializeApp(firebaseConfig);
const createSendToken = (type, user, statusCode, res) => {
  const token = generateToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 1000
    ),
    secure: true,
    httpOnly: true,
  };
  res.cookie("jwt", token, cookieOptions);
  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    message: `${type} successfully!`,
    token,
    data: {
      user,
    },
  });
};
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
});

//testing success
transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready for messages");
    console.log(success);
  }
});
const protect = async (req, res, next) => {
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
    return res.status(401).json({
      status: "fail",
      message: "You are not logged in! Please log in to get access.",
    });
  }
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findOne({ _id: decoded.id });

  if (!user) {
    return res.status(401).json({
      status: "fail",
      message: "The user belonging to this token does no longer exist.",
    });
  }
  req.user = user;
  next();
};
const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: "fail",
        message: "You do not have permission to perform this action",
      });
    }

    next();
  };
};

//@description     Register new user
//@route           POST /api/user/
//@access          Public
const signUpNormal = async (req, res) => {
  const { name, email, password, gender, dateOfBirth, typeOfAccount } =
    req.body;

  if (
    !name ||
    !email ||
    !password ||
    !gender ||
    !dateOfBirth ||
    !typeOfAccount
  ) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }
  // if (password !== passwordConfirm) {
  //   res.status(400);
  //   throw new Error("The password confirmation did not match");
  // }
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    gender,
    dateOfBirth,
    typeOfAccount,
  });
  createSendToken("Sign up", user, 201, res);
};
const signUpAuth = async (req, res) => {
  const {
    name,
    uid,
    email,
    gender,
    dateOfBirth,
    avatar,
    typeOfAccount,
    federatedId,
  } = req.body;

  if (
    !name ||
    !email ||
    !uid ||
    !gender ||
    !dateOfBirth ||
    !typeOfAccount ||
    (!federatedId && typeOfAccount === "facebook")
  ) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
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
  createSendToken("Sign up", user, 200, res);
};
const registerUser = asyncHandler(async (req, res) => {
  if (req.body.typeOfAccount === "normal") {
    await signUpNormal(req, res);
  } else {
    await signUpAuth(req, res);
  }
});

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  //check if email exists
  await User.findOne({ email })
    .then((data) => {
      if (data != null) {
        //user exists
        //proceed with email to reset password
        sendResetEmail(data, res);
      } else {
        res.status(400).json({
          status: "Failed",
          message: "No account with the supplied email exists!",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({
        status: "Failed",
        message: "An error occurred while checking for existing user",
      });
    });
};

//send password reset email
const sendResetEmail = (user, res) => {
  const resetString = generateToken(user._id);

  user.resetToken = null;
  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: user.email,
    subject: "Password Reset",
    html: `<p>We heard that you lost the password. </p>
            <p>Don't worry, use the link below to reset it.</p>
            <p>This link <b>expires in 60 minutes</b>. Press
            <a href=${
              "http://localhost:3000/resetPassword" +
              "/" +
              user._id +
              "/" +
              resetString
            }>here<a/> to proceed.</p>`,
  };

  //hash the reset string
  const saltRounds = 10;
  bcrypt
    .hash(resetString, saltRounds)
    .then((hashResetString) => {
      //set values in password reset collection
      (user.resetToken = hashResetString),
        (user.createAt = Date.now()),
        (user.expireAt = Date.now() + 3600000);

      User.findByIdAndUpdate(user._id, user, {
        new: true,
        runValidators: true,
      })
        .then(() => {
          transporter
            .sendMail(mailOptions)
            .then(() => {
              //reset email sent and password reset record saved
              res.status(200).json({
                status: "PENDING",
                message: "Password reset email sent",
              });
            })
            .catch((error) => {
              console.log(error);
              res.status(404).json({
                status: "Failed",
                message: "Password reset email failed",
              });
            });
        })
        .catch((error) => {
          console.log(error);
          res.status(404).json({
            status: "Failed",
            message: "Couldn't save password reset data",
          });
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(404).json({
        status: "Failed",
        message: "An error occured while hashing the password reset data",
      });
    });
};

const resetPassword = async (req, res, next) => {
  if (req.body.password !== req.body.passwordConfirm) {
    return res.status(400).json({
      status: "fail",
      message: "The password and its password confirm does not match!",
    });
  }
  const token = req.params.token;
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
    return res.status(400).json({
      status: "fail",
      message: "Unable to reset password due to user is not found!",
    });
  }
  resetedUser.password = req.body.password;
  resetedUser.resetToken = undefined;
  resetedUser.createAt = undefined;
  resetedUser.expireAt = undefined;
  await resetedUser.save({ validateBeforeSave: false });
  res.status(200).json({
    status: "success",
    message: "Reset password successfully!",
  });
};

const login = async (req, res, next) => {
  const type = req.query.type;
  if (type === "google") await logInGoogle(req, res);
  else if (type === "facebook") await logInFacebook(req, res);
  else {
    const { email, password } = req.body;
    console.log(email, password);

    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide email or password!",
      });
    }

    const user = await User.findOne({ email }).select("+password");
    console.log();
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({
        status: "fail",
        message: "Incorrect email or password!",
      });
    }
    createSendToken("Log in", user, 200, res);
  }
};
const logInGoogle = async (req, res) => {
  const { authentication, email } = req.body;
  try {
    const decodedToken = await admin.auth().verifyIdToken(authentication);
    const user = await User.findOne({ email }).select("+uid");
    if (!user || !(await user.matchUid(decodedToken.uid, user.uid))) {
      return res.status(401).json({
        status: "fail",
        message: "Log in Google unsuccessfully!",
      });
    }
    createSendToken("Log in", user, 200, res);
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: err.message,
    });
  }
};
const logInFacebook = async (req, res) => {
  const { authentication, federatedId } = req.body;
  try {
    const decodedToken = await admin.auth().verifyIdToken(authentication);
    const user = await User.findOne({ federatedId }).select("+uid");
    if (!user || !(await user.matchUid(decodedToken.uid, user.uid))) {
      return res.status(401).json({
        status: "fail",
        message: "Log in Facebook unsuccessfully!",
      });
    }
    createSendToken("Log in", user, 200, res);
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: err.message,
    });
  }
};
const logout = async (req, res, next) => {
  res.cookie("jwt", "", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    status: "success",
    message: "Logged out successfully!",
  });
};

const checkExistEmail = async (req, res, next) => {
  const { email } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({
      status: "fail",
    });
  }
  res.status(200).json({
    status: "ok",
  });
};
module.exports = {
  registerUser,
  forgotPassword,
  sendResetEmail,
  resetPassword,
  login,
  logout,
  protect,
  restrictTo,
  checkExistEmail,
};
