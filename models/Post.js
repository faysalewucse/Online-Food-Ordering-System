const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  location: {
    type: String,
  },
  condition: {
    type: String,
  },
  images: {
    type: Array,
  },
  brand: {
    type: String,
  },
  model: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: String,
  },
  phone: {
    type: String,
  },
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
