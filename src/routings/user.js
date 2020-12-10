const express = require("express");

const router = express.Router();
const usersController = require("../controllers/users");

router.post("/post-signup", usersController.signUp);
router.post("/post-login", usersController.login);
router.post("/check-token-validity", usersController.checkTokenValidity);
router.get("/get-user/:username", usersController.getProfile);
router.post("/getUserName", usersController.getUserName);
router.post("/check-user", usersController.checkUser);
module.exports = router;