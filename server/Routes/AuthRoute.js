const express = require('express');
const router = express.Router();
const { Signup, Login, createPost, getPostById } = require('../Controllers/AuthController');
const { userVerification } = require("../Middlewares/AuthMiddleware");
const { getUserProfile } = require('../Controllers/AuthController');


router.post('/signup', Signup);
router.post('/login', Login);
router.get('/profile', userVerification, getUserProfile);
router.post('/blog', userVerification, createPost); // New route for creating posts
router.get('/posts/:postId', getPostById);


module.exports = router;