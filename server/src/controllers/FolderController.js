const { CREATED, OK } = require("../core/successResponse");
const FolderService = require("../services/FolderService");

class FolderController {
  static createFolder = async (req, res, next) => {
    const folder = await FolderService.createFolder({
      userId: req.user.id,
      parentId: req.body.parentId,
    });
    return new CREATED({
      message: "Create folder successfully!",
      metadata: {
        folder,
      },
    }).send(res);
  };
  static getChildOfFolder = async (req, res, next) => {
    const childs = await FolderService.getChildOfFolder({
      userId: req.user.id,
      folderId: req.query.parentId,
    });

    return new OK({
      message: "Get child of folder successfully!",
      metadata: {
        childs,
      },
    }).send(res);
  };
}

module.exports = FolderController;
