const express = require("express");
const userController = require("../controllers/user");
const router = express.Router();
const auth = require("../auth");

const { verify } = auth;

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/details", verify, userController.getUserDetails);

module.exports = router;
