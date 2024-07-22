const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Buku = sequelize.define('Buku', {
        kode_buku: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        ISBN: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        judul: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pengarang: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tahun_terbit: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        jmlh_hlm: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        tableName: 'Buku',
    });

    return Buku;
};
