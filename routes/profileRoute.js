const express = require('express');
const { createProfile, getProfiles, getProfile, updateProfile, deleteProfile, getProfileByUsername } = require('../controllers/profileController');
const { authenticateToken, authorizeRole, authorizeUsername} = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authenticateToken, createProfile);
router.get('/', authenticateToken, authorizeRole('admin'), getProfiles);
router.put('/edit/:username', authenticateToken, authorizeRole('admin'), updateProfile);
router.delete('/:username', authenticateToken, authorizeRole('admin'), deleteProfile);
router.get('/user/:username', authenticateToken, authorizeUsername, getProfileByUsername);

module.exports = router;
