const { Folder } = require("../models/folderModel");
const User = require("../models/userModel");
const { BadRequestError } = require("../core/errorResponse");
class FolderService {
  async createFolder({ userId, parentId }) {
    const folder = new Folder({
      parentId,
      user: userId,
      dateAdded: Date.now(),
      datePlayed: Date.now(),
    });
    let rightValue;
    if (!parentId) {
      const maxRightValue = await Folder.findOne({ user: userId }, "right", {
        sort: { right: -1 },
      });
      rightValue = maxRightValue ? maxRightValue.right + 1 : 1;
      await User.findByIdAndUpdate(userId, {
        $addToSet: {
          folders: folder,
        },
      });
    } else {
      const parentFolder = await Folder.findById(parentId);
      if (!parentFolder) {
        throw new BadRequestError(`Parent folder not found!`);
      }

      rightValue = parentFolder.right;
      await Folder.updateMany(
        {
          user: userId,
          right: { $gte: rightValue },
        },
        {
          $inc: { right: 2 },
        }
      );
      await Folder.updateMany(
        {
          user: userId,
          left: { $gte: rightValue },
        },
        {
          $inc: { left: 2 },
        }
      );
    }

    folder.left = rightValue;
    folder.right = rightValue + 1;
    await folder.save();
    return folder;
  }

  async getChildOfFolder({ userId, folderId }) {
    let parentFolder;
    if (folderId !== "null" && folderId) {
      parentFolder = await Folder.findById(folderId);
      if (!parentFolder) {
        throw new BadRequestError(`Parent folder not found!`);
      }
    }
    const folder = await Folder.find({
      user: userId,
      parentId: folderId === "null" ? null : folderId,
    });
    return [...folder];
  }
}

module.exports = new FolderService();
