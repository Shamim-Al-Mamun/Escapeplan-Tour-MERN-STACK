const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Package = require("../models/packages.model");

exports.postPackage = async (req, res) => {
  try {
    const package = new Package({
      place: req.body.place,
      price: req.body.price,
      pic: req.body.pic,
      description: req.body.description,
    });
    await package.save();
    const packages = await Package.find();
    const newPackage = await Package.find({ email: req.body.email });
    res.status(200).json({
      message: "Package inserted successfully!",
      newPackage: newPackage,
      packages: packages,
    });
  } catch {
    res.status(500).json({
      message: "Insertation failed!",
      packages: [],
    });
  }
};

exports.getPackage = async (req, res) => {
  const package = await Package.find({ _id: req.params.id });
  if (package) {
    res.status(200).json({
      message: "package fetched succsessfully!",
      package: package,
    });
  } else {
    res.status(200).json({
      message: "package fetched was unsuccsessfull!",
      package: [],
    });
  }
};

exports.deletePackage = async (req, res) => {
  try {
    const package = await Package.findByIdAndDelete(req.params.id);
    const packages = await Package.find();
    res.status(200).json({
      Message: "Package was deleted successfully!",
      packages: packages,
    });
  } catch (err) {
    res.status(500).json({
      Message: "There was a server side error!",
      Error: err,
    });
  }
};
exports.getPackages = async (req, res) => {
  const packages = await Package.find();
  if (packages) {
    res.status(200).json({
      message: "packages fetched was succsessfully!",
      packages: packages,
    });
  } else {
    res.status(200).json({
      message: "fetched unsuccsessfull!",
      packages: [],
    });
  }
};
