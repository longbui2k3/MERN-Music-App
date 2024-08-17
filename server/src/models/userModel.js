const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const { DOCUMENT_NAME, COLLECTION_NAME } = require("../configs");

const userSchema = Schema(
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
      default: null,
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
      default: null,
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
      enum: ["admin", "user", "artist"],
      default: "user",
    },
    musicLists: {
      type: [
        {
          type: {
            musicList: { type: Schema.ObjectId, ref: DOCUMENT_NAME.MUSICLIST },
            dateAdded: { type: Date, required: true, default: Date.now() },
            datePlayed: { type: Date, required: true, default: Date.now() },
          },
        },
      ],
      default: [],
    },
    folders: {
      type: [{ type: Schema.ObjectId, ref: DOCUMENT_NAME.FOLDER }],
      default: [],
    },
    singers: {
      type: [
        {
          type: {
            singer: { type: Schema.ObjectId, ref: DOCUMENT_NAME.SINGER },
            dateAdded: { type: Date, required: true, default: Date.now() },
            datePlayed: { type: Date, required: true, default: Date.now() },
          },
        },
      ],
      default: [],
    },
  },
  { collection: COLLECTION_NAME.USER, timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.methods.matchUid = async function (enteredUid) {
  return await bcrypt.compare(enteredUid, this.uid);
};
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  if (this.typeOfAccount === "normal") {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } else {
    const salt = await bcrypt.genSalt(10);
    this.uid = await bcrypt.hash(this.uid, salt);
  }
});

module.exports = model(DOCUMENT_NAME.USER, userSchema);
