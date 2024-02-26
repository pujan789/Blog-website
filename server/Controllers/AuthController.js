const User = require("../Models/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");
const Post = require("../Models/PostModel");



module.exports.Signup = async (req, res) => { // Removed 'next' as it's not needed here
  try {
    const { email, password, username, createdAt } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await User.create({ email, password, username, createdAt });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    return res.status(201).json({ message: "User signed in successfully", success: true, user }); // Added 'return' to ensure function exits after this line
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred during the signup process" }); // Proper error handling
  }
};


module.exports.Login = async (req, res) => { // Removed 'next' as it's not used
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
     res.cookie("token", token, {
       withCredentials: true,
       httpOnly: false,
     });
     return res.status(201).json({ message: "User logged in successfully", success: true }); // Added 'return'
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred during the login process" }); // Proper error handling
  }
};

module.exports.createPost = async (req, res) => {
  try {
    const { postTitle, postBody } = req.body;
    const user = req.user; // This is now available thanks to the userVerification middleware
    const newPost = new Post({
      postTitle,
      postBody,
      user: user._id, // Assign the user ID to the post
    });

    await newPost.save();

    res.status(201).json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating post" });
  }
};