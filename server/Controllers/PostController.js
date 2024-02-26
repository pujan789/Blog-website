const User = require("../Models/UserModel");
const Post = require("../Models/PostModel");

module.exports.createPost = async (req, res) => {
    try {
      const { postTitle, postBody } = req.body;
      const user = req.user; // This is available thanks to the userVerification middleware
      
      // Create the post
      const newPost = new Post({
        postTitle,
        postBody,
        user: user._id, // Link the post to the user who created it
      });
  
      // Save the post to the database
      await newPost.save();
  
      // Now, update the user document to include this new post's ID in their posts array
      user.posts.push(newPost._id);
      await user.save(); // Save the updated user document
  
      // Respond to the request indicating success
      res.status(201).json({ message: "Post created successfully", post: newPost });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating post" });
    }
  };