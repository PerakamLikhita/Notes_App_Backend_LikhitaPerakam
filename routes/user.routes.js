const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { authenticateToken } = require("../utilities");

router.post("/Create-account", userController.createAccount);
router.post("/login", userController.login);
router.get("/get-user", authenticateToken, userController.getUser);

module.exports = router;