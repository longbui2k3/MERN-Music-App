"use strict";

const { Schema, model } = require("mongoose");
const { COLLECTION_NAME, DOCUMENT_NAME } = require("../configs");

const keyTokenSchema = Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    privateKey: {
      type: String,
      required: true,
    },
    publicKey: {
      type: String,
      required: true,
    },
    refreshTokensUsed: {
      type: Array,
      default: [],
    },
    refreshToken: {
      type: String,
      required: true,
    },
  },
  {
    collection: COLLECTION_NAME.KEYTOKEN,
    timestamps: true,
  }
);

const KeyToken = model(DOCUMENT_NAME.KEYTOKEN, keyTokenSchema);
module.exports = KeyToken;
