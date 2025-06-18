const express = require('express');
const { getProfile, updateProfile } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware')
const upload = require('../middlewares/uploadFile')

const router = express.Router();

// Get profile info
router.get('/me', protect, getProfile);

// Update profile (with optional image)
router.put('/me', protect, upload.single('profileImage'), updateProfile);

module.exports = router;
