const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.route("/").post(userController.registerUser);

module.exports = router;
