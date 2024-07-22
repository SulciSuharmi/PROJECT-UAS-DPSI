const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const DetailPengembalian = sequelize.define('DetailPengembalian', {
        id_detail_kmbl: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        judul: {
            type: DataTypes.STRING,
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
        jmlh_buku: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        tableName: 'DetailPengembalian',
    });

    return DetailPengembalian;
};
