const express = require("express");
const asyncHandler = require("../helpers/asyncHandler");
const { protect } = require("../auth/authUtils");
const FolderController = require("../controllers/FolderController");

const router = express.Router();
router.use(protect);
router.route("/").post(
  // #swagger.tags = ['Folder']
  // #swagger.summary = 'Create folder'
  /* #swagger.security = [{
      "apiKeyAuth": [],
      "clientId": []
    }] 
  */
  asyncHandler(FolderController.createFolder)
);
router.route("/childs").get(
  // #swagger.tags = ['Folder']
  // #swagger.summary = 'Get childs of folder'
  /* #swagger.security = [{
      "apiKeyAuth": [],
      "clientId": []
    }] 
  */
  asyncHandler(FolderController.getChildOfFolder)
);
module.exports = router;
