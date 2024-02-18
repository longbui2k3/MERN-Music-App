const { generateToken } = require("../configs");
const transporter = require("../configs/transporter");
const { FailedDependencyError } = require("../core/errorResponse");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const sendResetEmail = async (user) => {
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
  try {
    const saltRounds = 10;
    const hashResetString = await bcrypt.hash(resetString, saltRounds);
    user.resetToken = hashResetString;
    user.createAt = Date.now();
    user.expireAt = Date.now() + 3600000;
  } catch (error) {
    throw new FailedDependencyError(
      "An error occured while hashing the password reset data"
    );
  }

  const updatedUser = await User.findByIdAndUpdate(user._id, user, {
    new: true,
    runValidators: true,
  });

  if (!updatedUser)
    throw new FailedDependencyError("Couldn't save password reset data");

  const transport = await transporter.sendMail(mailOptions);

  if (!transport) {
    throw new FailedDependencyError("Password reset email failed!");
  }
};

module.exports = sendResetEmail;
