const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
require("dotenv").config();
const generateToken = require("../config/generateToken");

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

const forgotPassword = async (req, res) => {
  const { email, redirectUrl } = req.body;
  //check if email exists
  await User.findOne({ email })
    .then((data) => {
      if (data != null) {
        //user exists
        //proceed with email to reset password
        sendResetEmail(data, redirectUrl, res);
      } else {
        res.json({
          status: "Failed",
          message: "No account with the supplied email exists!",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.json({
        status: "Failed",
        message: "An error occurred while checking for existing user",
      });
    });
};

//send password reset email
const sendResetEmail = (user, redirectUrl, res) => {
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
              redirectUrl + "/" + user._id + "/" + resetString
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
              res.json({
                status: "PENDING",
                message: "Password reset email sent",
              });
            })
            .catch((error) => {
              console.log(error);
              res.json({
                status: "Failed",
                message: "Password reset email failed",
              });
            });
        })
        .catch((error) => {
          console.log(error);
          res.json({
            status: "Failed",
            message: "Couldn't save password reset data",
          });
        });
    })
    .catch((error) => {
      console.log(error);
      res.json({
        status: "Failed",
        message: "An error occured while hashing the password reset data",
      });
    });
};

const resetPassword = async (req, res, next) => {
  const token = req.params.token;
  const users = await User.find();

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
    });
  }
  resetedUser.password = req.body.password;
  resetedUser.resetToken = undefined;
  resetedUser.createAt = undefined;
  resetedUser.expireAt = undefined;
  resetedUser.save();
  resetedUser.password = null;
  res.status(200).json({
    status: "success",
    message: "Reset password successfully",
  });
};
module.exports = { forgotPassword, sendResetEmail, resetPassword };
