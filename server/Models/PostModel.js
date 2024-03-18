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
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Array of user IDs who liked the post
  comments: [{
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    text: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  image: {
    type: String,
    default: '', // Default can be an empty string or a placeholder image URL
  },
});

module.exports = mongoose.model("Post", postSchema);