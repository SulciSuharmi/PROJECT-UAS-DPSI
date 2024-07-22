const express = require('express');
const { createBuku, updateBuku, deleteBuku, searchBooks } = require('../controllers/bookController');
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authenticateToken, authorizeRole('admin'), createBuku);
router.put('/:kode_buku', authenticateToken, authorizeRole('admin'), updateBuku);
router.delete('/:kode_buku', authenticateToken, authorizeRole('admin'), deleteBuku);
router.get('/search', authenticateToken, searchBooks);

module.exports = router;
