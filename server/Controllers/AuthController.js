const User = require("../Models/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");
const Post = require("../Models/PostModel");
const { faker } = require('@faker-js/faker');




module.exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if(!email || !password){
      return res.json({message:'All fields are required'});
    }
    const user = await User.findOne({ email });
    if(!user){
      return res.json({message:'Incorrect password or email'});
    }
    const auth = await bcrypt.compare(password,user.password);
    if (!auth) {
      return res.json({message:'Incorrect password or email'});
    }
    const token = createSecretToken(user._id);
    
    
    return res.status(201).json({ message: "User logged in successfully", success: true, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred during the login process" });
  }
};

// Signup Controller
module.exports.Signup = async (req, res) => {
  try {
    const { email, password, username, createdAt } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await User.create({ email, password, username, createdAt });
    const token = createSecretToken(user._id);
    return res.status(201).json({ message: "User signed in successfully", success: true, user, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred during the signup process" });
  }
};
module.exports.createPost = async (req, res) => {
  try {
    const { postTitle, postBody } = req.body;
    let image = '';
    if (req.file) {
      image = req.file.path; 
    }
    const user = req.user; 
    const newPost = new Post({
      postTitle,
      postBody,
      user: user._id, 
      image: image
    });

    await newPost.save();

    await User.findByIdAndUpdate(
      user._id,
      { $push: { posts: newPost._id } }, 
      { new: true, useFindAndModify: false }
    );


    res.status(201).json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating post" });
  }
};

module.exports.getUserProfile = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  
  try {

    const userWithPosts = await User.findById(req.user.id)
    .populate({
      path: 'posts', // Populate posts
      populate: [
        { path: 'comments.postedBy', select: 'username' }, // Populate comment creators
        { path: 'likes', select: 'username' } // Populate users who liked the post
      ]
    })
    .exec();
    
    if (!userWithPosts) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.json({ message: "User profile data", user: userWithPosts });
  } catch (error) {
    console.error("Failed to fetch user profile", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// In your post controller
module.exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ post });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.user._id)) {
      await post.updateOne({ $push: { likes: req.user._id } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.user._id } });
      res.status(200).json("The post has been unliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const comment = {
      text: req.body.text,
      user: req.user._id
    };
    post.comments.push(comment);
    await post.save();
    res.status(200).json("The comment has been added");
  } catch (err) {
    res.status(500).json(err);
  }
};


module.exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('user', 'username avatar') // Populate user details
      .populate('comments.postedBy', 'username') // Populate comment creator details
      .sort({ createdAt: -1 }); // Sort by creation date, newest first
    res.json({ message: "All posts retrieved successfully", posts });
  } catch (error) {
    console.error("Failed to fetch posts", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.updateAvatar = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a new avatar using faker
    user.avatar = faker.image.avatar();
    await user.save();

    res.json({ avatar: user.avatar });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Could not update avatar' });
  }
};
