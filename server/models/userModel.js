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
    password: { type: String, required: true, select: false },
    resetToken: { type: String, required: false, select: false },
    createAt: { type: Date, required: false },
    expireAt: { type: Date, required: false },
    pic: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    favourites: [
      {
        songId: String,
      },
    ],
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  { timestamp: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);
module.exports = User;
