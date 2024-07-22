const jwt = require('jsonwebtoken');
require('dotenv').config(); // Make sure to load environment variables

// Middleware untuk memverifikasi token JWT dan mengatur data pengguna ke dalam objek request
exports.authenticateToken = (req, res, next) => {
  // Mengambil token dari header Authorization, yang biasanya dalam format "Bearer <token>"
  const token = req.header('Authorization')?.split(' ')[1];
  console.log("Extracted token:", token);
  // Jika tidak ada token, kirimkan status 401 (Unauthorized)
  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    // Verifikasi token menggunakan secret key
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    // Menyimpan informasi pengguna yang terverifikasi ke dalam objek request
    req.user = verified;
    // Melanjutkan ke middleware berikutnya
    next();
  } catch (error) {
    // Jika token tidak valid, kirimkan status 400 (Bad Request)
    console.error("Token verification error:", error.message);
    res.status(400).json({ message: 'Invalid token' });
  }
};

// Middleware untuk memeriksa apakah pengguna memiliki peran yang sesuai
exports.authorizeRole = (role) => {
  return (req, res, next) => {
    // Memeriksa apakah peran pengguna sesuai dengan peran yang diizinkan
    if (req.user.role !== role) {
      // Jika tidak sesuai, kirimkan status 403 (Forbidden)
      return res.status(403).json({ message: 'Forbidden' });
    }
    // Melanjutkan ke middleware berikutnya jika peran sesuai
    next();
  };
};

exports.authorizeUsername = (req, res, next) => {
  const { username } = req.params;

  // Check if user's role is 'admin' or if the username matches the authenticated user's username
  if (req.user.role !== 'admin' && req.user.username !== username) {
    // If not, send 403 (Forbidden)
    return res.status(403).json({ message: 'Forbidden' });
  }
  // Proceed to the next middleware if the username matches
  next();
};
