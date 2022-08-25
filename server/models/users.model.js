const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const loginSchema = new Schema({
  username: { type: String, default: "User" },
  email: { type: String, required: true },
  type: {
    type: String,
    default: "General",
    enum: ["Admin", "General"],
    required: true,
  },
  booking: { type: Array, default: [] },
  packages: { type: Array, default: [] },
  password: { type: String, required: true },
  userImage: { type: String, default: "sample.webp" },
  token: { type: String },
  status: { type: Boolean, default: true },
});

module.exports = mongoose.model("EscapePlan_user", loginSchema);
