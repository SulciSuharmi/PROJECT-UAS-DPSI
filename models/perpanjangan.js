const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Perpanjangan = sequelize.define('Perpanjangan', {
        id_perpanjangan: {
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
        tgl_pengembalian_baru: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        tgl_perpanjangan: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        status_perpanjangan: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        tableName: 'Perpanjangan',
    });

    return Perpanjangan;
};
