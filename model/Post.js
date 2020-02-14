const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: String,
  body: String,
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Post = mongoose.model("Post", PostSchema);
