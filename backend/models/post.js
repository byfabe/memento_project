const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  userId: { type: String, required: true },
  text: { type: String },
});

module.exports = mongoose.model("posts", postSchema);