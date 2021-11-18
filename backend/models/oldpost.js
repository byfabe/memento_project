const mongoose = require("mongoose");

const oldpostSchema = mongoose.Schema({
  userId: { type: String, required: true },
  text: { type: String },
  x: { type: Number },
  y: { type: Number },
  color: { type: String },
  dates: {type: Date, default: Date.now},
});

module.exports = mongoose.model("oldposts", oldpostSchema);