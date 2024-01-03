const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    gender: {
      type: String,
      required: true,
      enum: [
        "Man",
        "Woman",
        "Non-binary",
        "Something else",
        "Prefer not to say",
      ],
    },
    dateOfBirth: { type: Date, required: true },
    typeOfAccount: {
      type: String,
      enum: ["normal", "google", "facebook"],
      default: "normal",
    },
    password: {
      type: String,
      select: false,
      default: "",
      validate: {
        validator: function (val) {
          if (this.typeOfAccount === "normal") return val ? true : false;
          return true;
        },
        message: "Please enter your password!",
      },
    },
    uid: {
      type: String,
      select: false,
      default: "",
      validate: {
        validator: function (val) {
          if (
            this.typeOfAccount === "google" &&
            this.typeOfAccount === "facebook"
          )
            return val ? true : false;
          return true;
        },
        message: "Please enter your uid!",
      },
    },
    federatedId: {
      type: String,
      default: "",
      validate: {
        validator: function (val) {
          if (this.typeOfAccount === "facebook") return val ? true : false;
          return true;
        },
        message: "Please enter your federated id!",
      },
    },
    resetToken: { type: String, required: false, select: false },
    createAt: { type: Date, required: false },
    expireAt: { type: Date, required: false },
    avatar: {
      type: String,
      // default:
      //   "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    listSongs: [{ type: mongoose.Schema.ObjectId, ref: "ListSongs" }],
  },
  { timestamp: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.methods.matchUid = async function (enteredUid) {
  return await bcrypt.compare(enteredUid, this.uid);
};
userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }
  if (this.typeOfAccount === "normal") {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } else {
    const salt = await bcrypt.genSalt(10);
    this.uid = await bcrypt.hash(this.uid, salt);
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
