const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Pengembalian = sequelize.define('Pengembalian', {
        id_pengembalian: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_peminjaman: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'TransaksiPeminjaman',
                key: 'id_peminjaman',
            },
        },
        id_anggota: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'AnggotaPerpustakaan',
                key: 'id_anggota',
            },
        },
        kode_buku: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'Buku',
                key: 'kode_buku',
            },
        },
        tanggal_peminjaman: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        tanggal_pengembalian: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    }, {
        tableName: 'Pengembalian',
    });

    return Pengembalian;
};
