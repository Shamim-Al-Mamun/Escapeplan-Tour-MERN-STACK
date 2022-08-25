const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifytoken");

const {
  postUser,
  Authentication,
  getUser,
  getUsers,
  updateUser,
  checkEmail,
  resetPass,
  Logout,
} = require("../controllers/users.controller");

router.post("/signup", postUser);

router.get("/", verifyToken, getUser);

router.get("/all", verifyToken, getUsers);

router.put("/:id", verifyToken, updateUser);

router.post("/login", Authentication);

router.post("/forgotpass", checkEmail);

router.post("/resetpass", resetPass);

router.get("/logout", verifyToken, Logout);

module.exports = router;
