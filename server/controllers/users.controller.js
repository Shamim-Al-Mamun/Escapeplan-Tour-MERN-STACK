const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users.model");

exports.postUser = async (req, res) => {
  try {
    const user = await User.find({ email: req.body.email });
    if (user && user.length > 0) {
      res.status(200).json({
        message: "Email already exists!",
        user: false,
      });
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      if (!req.body.username) {
        req.body.username = "User";
      }
      const user = new User({
        username: req.body.username,
        email: req.body.email,
        role: req.body.role,
        password: hashedPassword,
      });
      await user.save();
      const users = await User.find();
      const newuser = await User.find({ email: req.body.email });
      res.status(200).json({
        message: "Signup was successful!",
        newuser: newuser,
        user: users,
      });
    }
  } catch {
    res.status(500).json({
      message: "Signup failed!",
      user: false,
    });
  }
};

exports.Authentication = async (req, res) => {
  try {
    const user = await User.find({ email: req.body.email });
    if (user && user.length > 0) {
      bcrypt.compare(
        req.body.password,
        user[0].password,
        function (err, result) {
          if (result) {
            //Generate token
            var token = jwt.sign(
              {
                email: user[0].email,
                userId: user[0]._id,
              },
              process.env.JWT_KEY
            );
            async function setToken() {
              await User.findOneAndUpdate(
                { email: req.body.email },
                {
                  token: token,
                }
              );
            }
            setToken();
            res.status(200).json({
              message: "Login succsessfully!",
              access_token: token,
              user: user,
            });
          } else {
            res.status(202).json({
              message: "Incorrect password!",
              access_token: false,
              user: false,
            });
          }
        }
      );
    } else {
      res.status(202).json({
        message: "Email not found!",
        access_token: false,
        user: false,
      });
    }
  } catch {
    res.status(500).json({
      message: "Login failed!",
      access_token: false,
      user: false,
    });
  }
};

exports.getUser = async (req, res) => {
  const user = await User.find({ email: req.email });
  if (user) {
    res.status(200).json({
      message: "user fetched succsessfully!",
      user: user,
    });
  } else {
    res.status(200).json({
      message: "fetched unsuccsessfull!",
      user: [],
    });
  }
};

exports.checkEmail = async (req, res) => {
  const user = await User.find({ email: req.body.email });
  if (user && user.length > 0) {
    res.status(200).json({
      message: "user fetched succsessfully!",
      user: user,
    });
  } else {
    res.status(200).json({
      message: "Email not found!",
      user: [],
    });
  }
};

exports.getUsers = async (req, res) => {
  const users = await User.find();
  if (users) {
    res.status(200).json({
      message: "user fetched succsessfully!",
      users: users,
    });
  } else {
    res.status(200).json({
      message: "fetched unsuccsessfull!",
      users: [],
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body);
    const users = await User.find();
    const updatedUser = await User.findOne({ _id: req.params.id });
    res.status(200).json({
      Message: "User was updated successfully!",
      users: users,
      updatedUser: updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      Message: "There was a server side error!",
      Error: err,
    });
  }
};

exports.resetPass = async (req, res) => {
  console.log(req.body);
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await User.findOneAndUpdate(
      { email: req.body.email },
      { password: hashedPassword }
    );
    res.status(202).json({
      message: "Password changed successfully!",
      reset: true,
    });
  } catch (err) {
    res.status(500).json({
      Message: "There was a server side error!",
      Error: err,
      updatedUser: [],
    });
  }
};
exports.Logout = async (req, res) => {
  try {
    const token = "";
    await User.findOneAndUpdate(
      { email: req.email },
      {
        token: token,
      }
    );
    return res.status(202).json({
      message: "Logout succsessfully!",
      token: token,
      user: [],
    });
  } catch (er) {
    res.status(500).json({
      Message: "There was a server side error!",
      Error: err,
      user: [],
    });
  }
};
