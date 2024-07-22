const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const { Akun } = require('../models');


require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

const register = [
  check('username').isLength({ min: 3 }),
  check('password').isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password, role } = req.body;

    if (role === 'admin' && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can create other admins' });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const akun = await Akun.create({ username, password: hashedPassword, role: role || 'user' });
      res.status(201).json({ message: 'User registered successfully', akun });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
];

const login = [
  check('username').isLength({ min: 3 }),
  check('password').isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;
    try {
      const akun = await Akun.findOne({ where: { username } });
      if (!akun) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, akun.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ username: akun.username, role: akun.role }, JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
];

module.exports = { register, login };
