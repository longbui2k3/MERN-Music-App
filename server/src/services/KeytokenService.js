const { Types } = require("mongoose");
const KeyToken = require("../models/keytokenModel");

class KeytokenService {
  async createKeyToken({ userId, publicKey, privateKey, refreshToken }) {
    try {
      const filter = { user: userId };
      const update = {
        publicKey,
        privateKey,
        refreshTokenUsed: [],
        refreshToken,
      };
      const options = {
        upsert: true,
        new: true,
      };
      const tokens = await KeyToken.findOneAndUpdate(filter, update, options);

      return tokens ? tokens.publicKey : null;
    } catch (error) {
      return error;
    }
  }
  async findByUserId(userId) {
    return await KeyToken.findOne({ user: new Types.ObjectId(userId) });
  }
  async removeKeyById(id) {
    return await KeyToken.deleteOne({
      _id: new Types.ObjectId(id),
    });
  }
}

module.exports = new KeytokenService();
