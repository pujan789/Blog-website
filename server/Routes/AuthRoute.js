const express = require('express');
const router = express.Router();
const { Signup, Login, createPost } = require('../Controllers/AuthController');
const { userVerification } = require("../Middlewares/AuthMiddleware");

router.post('/signup', Signup);
router.post('/login', Login);
router.post('/profile', userVerification); // Assuming this is a route that requires verification
router.post('/blog', userVerification, createPost); // New route for creating posts

module.exports = router;