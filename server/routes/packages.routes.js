const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifytoken");
const upload = require("../middlewares/uploads");

const {
  postPackage,
  getPackage,
  deletePackage,
  getPackages,
} = require("../controllers/packages.controller");

router.post("/addpackage", verifyToken, upload, postPackage);

router.get("/all", getPackages);

router.get("/:id", getPackage);

router.delete("/:id", verifyToken, deletePackage);

module.exports = router;
