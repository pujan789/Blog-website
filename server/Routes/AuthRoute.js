const express = require('express');
const router = express.Router();
const { Signup, Login, createPost, getPostById, likePost, addComment, getAllPosts, updateAvatar } = require('../Controllers/AuthController');
const { userVerification } = require("../Middlewares/AuthMiddleware");
const { getUserProfile } = require('../Controllers/AuthController');
const upload = require('../upload'); 


router.post('/signup', Signup);
router.post('/login', Login);
router.get('/profile', userVerification, getUserProfile);
router.post('/blog', userVerification, upload.single('image'), createPost); // New route for creating posts.
router.get('/posts/:postId', getPostById); 

// To like a post
router.put('/posts/:id/like', userVerification, likePost);

// To comment on a post
router.post('/posts/:id/comment', userVerification, addComment);

router.put('/avatar', userVerification, updateAvatar);


router.get('/posts', getAllPosts);





module.exports = router;