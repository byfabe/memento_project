const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  userId: { type: String, required: true },
  text: { type: String, required: true },
});

module.exports = mongoose.model("posts", postSchema);