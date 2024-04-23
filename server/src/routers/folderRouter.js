const express = require("express");
const asyncHandler = require("../helpers/asyncHandler");
const { protect } = require("../auth/authUtils");
const FolderController = require("../controllers/FolderController");

const router = express.Router();
router.use(protect);
router.route("/").post(asyncHandler(FolderController.createFolder));
router.route("/childs").get(asyncHandler(FolderController.getChildOfFolder));
module.exports = router;
