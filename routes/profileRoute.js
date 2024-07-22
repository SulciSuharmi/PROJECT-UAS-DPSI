const express = require('express');
const { createProfile, getProfiles, getProfile, updateProfile, deleteProfile, getProfileByUsername } = require('../controllers/profileController');
const { authenticateToken, authorizeRole, authorizeUsername} = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/profile', authenticateToken, createProfile);
router.get('/profiles', authenticateToken, authorizeRole('admin'), getProfiles);
router.put('/profile/edit/:username', authenticateToken, authorizeRole('admin'), updateProfile);
router.delete('/profile/:username', authenticateToken, authorizeRole('admin'), deleteProfile);
router.get('/profile/user/:username', authenticateToken, authorizeUsername, getProfileByUsername);

module.exports = router;
