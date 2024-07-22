const { AnggotaPerpustakaan, Akun } = require('../models');
const { check, validationResult } = require('express-validator');

// Middleware to check if the user is admin
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  next();
};

// Create Profile
const createProfile = [
  check('nama').notEmpty(),
  check('email').isEmail(),
  check('alamat').notEmpty(),
  check('status_keanggotaan').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nama, email, alamat, status_keanggotaan } = req.body;
    const username = req.user.username;

    try {
      const existingProfile = await AnggotaPerpustakaan.findOne({ where: { username } });

      if (existingProfile) {
        return res.status(400).json({ message: 'User can only create one profile, Please Contact Admin To Edit Your Profile' });
      }

      const profile = await AnggotaPerpustakaan.create({
        username,
        nama,
        email,
        alamat,
        status_keanggotaan,
        tanggal_registrasi: new Date(),
      });

      res.status(201).json({ message: 'Profile created successfully', profile });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
];


// Get All Profiles (Admin Only)
const getProfiles = [
  isAdmin,
  async (req, res) => {
    try {
      const profiles = await AnggotaPerpustakaan.findAll();
      res.status(200).json(profiles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
];

// Get Profile by Username
const getProfileByUsername = [
  async (req, res) => {
    try {
      const { username } = req.params;
      const profile = await AnggotaPerpustakaan.findOne({ where: { username } });

      if (!profile) {
        return res.status(404).json({ message: 'Profile not found' });
      }

      res.status(200).json(profile);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
];


// Get Single Profile
const getProfile = [
  async (req, res) => {
    try {
      const { id } = req.params;
      const profile = await AnggotaPerpustakaan.findByPk(id);

      if (!profile) {
        return res.status(404).json({ message: 'Profile not found' });
      }

      if (req.user.role !== 'admin' && req.user.username !== profile.username) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      res.status(200).json(profile);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
];

// Update Profile
const updateProfile = [
  async (req, res) => {
    const { username } = req.params;
    const { nama, email, alamat, status_keanggotaan } = req.body;

    try {
      const profile = await AnggotaPerpustakaan.findOne({ where: { username } });

      if (!profile) {
        return res.status(404).json({ message: 'Profile not found' });
      }

      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden' });
      }

      profile.nama = nama;
      profile.email = email;
      profile.alamat = alamat;
      profile.status_keanggotaan = status_keanggotaan;
      await profile.save();

      res.status(200).json({ message: 'Profile updated successfully', profile });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
];

// Delete Profile (Admin Only)
const deleteProfile = [
  isAdmin,
  async (req, res) => {
    const { username } = req.params;

    try {
      const profile = await AnggotaPerpustakaan.findOne({ where: { username } });
      if (!profile) {
        return res.status(404).json({ message: 'Profile not found' });
      }

      await profile.destroy();
      res.status(200).json({ message: 'Profile deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
];

module.exports = { createProfile, getProfiles, getProfile, updateProfile, deleteProfile, getProfileByUsername };
