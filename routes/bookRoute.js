// Mengimpor library yang dibutuhkan
const express = require('express');
const { createBuku, updateBuku, deleteBuku, searchBooks } = require('../controllers/bookController');
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');

const router = express.Router();

// Route untuk membuat buku, hanya dapat diakses oleh admin
router.post('/', authenticateToken, authorizeRole('admin'), createBuku);

// Route untuk memperbarui buku berdasarkan kode buku, hanya dapat diakses oleh admin
router.put('/:kode_buku', authenticateToken, authorizeRole('admin'), updateBuku);

// Route untuk menghapus buku berdasarkan kode buku, hanya dapat diakses oleh admin
router.delete('/:kode_buku', authenticateToken, authorizeRole('admin'), deleteBuku);

// Route untuk mencari buku, dapat diakses oleh semua pengguna yang terautentikasi
router.get('/search', authenticateToken, searchBooks);

module.exports = router;
