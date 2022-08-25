const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const packageSchema = new Schema({
  place: { type: String, default: "Dhaka" },
  price: { type: Number, required: true },
  pic: { type: String, default: "package.webp" },
  description: { type: String, default: "Dhaka" },
  status: { type: Boolean, default: true },
});

module.exports = mongoose.model("EscapePlan_package", packageSchema);
