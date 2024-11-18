const express = require('express');
const { registerUser, loginUser, googleAuth, googleAuthCallback } = require('../controllers/authController');



const router = express.Router();

// Auth routes for user register and login  
router.post('/register', registerUser);
router.post('/login', loginUser);

// Google Auth
router.get('/google', googleAuth);
router.get('/google/callback', googleAuthCallback);

module.exports=router;

