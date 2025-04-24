const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");

// login reiceves username and password and returns a token
router.route("/").post(userController.login);

module.exports = router;
