const { Buku } = require('../models');
const { Sequelize } = require('sequelize');

const searchBooks = async (req, res) => {
    try {
        const { keyword } = req.query;
        const books = await Buku.findAll({
            where: {
                [Sequelize.Op.or]: [
                    { judul: { [Sequelize.Op.like]: `%${keyword}%` } },
                    { pengarang: { [Sequelize.Op.like]: `%${keyword}%` } }
                ]
            }
        });
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: 'Search failed', error: error.message });
    }
};

const createBuku = async (req, res) => {
  const { kode_buku, ISBN, judul, pengarang, tahun_terbit, jmlh_hlm } = req.body;
  try {
    const buku = await Buku.create({ kode_buku, ISBN, judul, pengarang, tahun_terbit, jmlh_hlm });
    res.status(201).json({ message: 'Book created successfully', buku });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateBuku = async (req, res) => {
  const { kode_buku } = req.params;
  const { ISBN, judul, pengarang, tahun_terbit, jmlh_hlm } = req.body;
  try {
    const buku = await Buku.findByPk(kode_buku);
    if (!buku) return res.status(404).json({ message: 'Book not found' });

    buku.ISBN = ISBN;
    buku.judul = judul;
    buku.pengarang = pengarang;
    buku.tahun_terbit = tahun_terbit;
    buku.jmlh_hlm = jmlh_hlm;
    await buku.save();

    res.status(200).json({ message: 'Book updated successfully', buku });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteBuku = async (req, res) => {
  const { kode_buku } = req.params;
  try {
    const buku = await Buku.findByPk(kode_buku);
    if (!buku) return res.status(404).json({ message: 'Book not found' });

    await buku.destroy();
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { searchBooks, createBuku, updateBuku, deleteBuku };
