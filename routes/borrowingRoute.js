const express = require('express');
const router = express.Router();
const {borrowBook,extendBorrowing, getAllBorrowings, getBorrowingsByUsername, getAllExtends} = require('../controllers/borrowingController');
const { authenticateToken, authorizeRole, authorizeUsername} = require('../middleware/authMiddleware');

router.post('/borrow', authenticateToken, borrowBook);
router.get('/borrowings', authenticateToken, authorizeRole("admin"), getAllBorrowings);
router.get('/borrowings/user/:username', authenticateToken, authorizeUsername, getBorrowingsByUsername);
router.post('/extend', authenticateToken, extendBorrowing);
router.get('/extend', authenticateToken, authorizeRole("admin"), getAllExtends);

module.exports = router;
