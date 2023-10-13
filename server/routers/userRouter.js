const express = require("express");
const userController = require("../controllers/userController");
const authenController = require("../controllers/authenController");
const router = express.Router();

router.route("/").post(userController.registerUser);
router.route("/:id").get(userController.getUserById);
router.route("/requestPaswordReset").post(authenController.forgotPassword);

module.exports = router;
