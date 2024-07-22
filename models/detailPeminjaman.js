const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const DetailPeminjaman = sequelize.define('DetailPeminjaman', {
        id_detail_pnjm: {
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
        jmlh_buku: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        denda: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        status_pengembalian: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        tableName: 'DetailPeminjaman',
    });

    return DetailPeminjaman;
};
