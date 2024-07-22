const { TransaksiPeminjaman, Perpanjangan, Akun, AnggotaPerpustakaan } = require('../models');
const perpanjangan = require('../models/perpanjangan');

// Borrow Book
exports.borrowBook = async (req, res) => {
    try {
        const { id_anggota, kode_buku, tanggal_peminjaman, tanggal_pengembalian } = req.body;
        await TransaksiPeminjaman.create({ id_anggota, kode_buku, tanggal_peminjaman, tanggal_pengembalian });
        res.status(201).send({ message: 'Book borrowed successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Borrowing failed', error });
    }
};

// Get all borrowings for admin
exports.getAllBorrowings = async (req,res) => {
    try {
        const borrowings = await TransaksiPeminjaman.findAll();
        res.status(200).json(borrowings);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve borrowings', error });
    }
};

// Get borrowings by username
exports.getBorrowingsByUsername = async (req, res) => {
    try {
        const { username } = req.params;

        // Find borrowings by joining with AnggotaPerpustakan table and filtering by username
        const borrowings = await TransaksiPeminjaman.findAll({
            include: [{
                model: AnggotaPerpustakaan,
                where: { username },
                attributes: [] // We don't need any attributes from AnggotaPerpustakan
            }]
        });

        if (borrowings.length === 0) {
            return res.status(404).json({ message: 'No Borrowing Book Found' });
        }

        res.status(200).json(borrowings);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve borrowings', error: error.message });
    }
};

// Get all extends for admin
exports.getAllExtends = async (req, res) => {
    try {
        const extend = await Perpanjangan.findAll();
        res.status(200).json(extend);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve extends', error });
    }
};

// Extend Borrowing
exports.extendBorrowing = async (req, res) => {
    try {
        const { id_peminjaman, tgl_perpanjangan, tgl_pengembalian_baru, status_perpanjangan } = req.body;
        await Perpanjangan.create({ id_peminjaman, tgl_pengembalian_baru, tgl_perpanjangan, status_perpanjangan });
        res.status(201).send({ message: 'Borrowing extended successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Extension failed', error });
    }
};