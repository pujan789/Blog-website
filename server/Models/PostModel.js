const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  postTitle: {
    type: String,
    required: [true, "Post title is required"],
  },
  postBody: {
    type: String,
    required: [true, "Post body is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment' // Assuming you might add a Comment model later
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model("Post", postSchema);