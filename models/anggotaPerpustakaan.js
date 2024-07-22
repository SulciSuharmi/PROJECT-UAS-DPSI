const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const AnggotaPerpustakaan = sequelize.define('AnggotaPerpustakaan', {
        id_anggota: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'Akun',
                key: 'username',
            },
        },
        nama: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        alamat: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status_keanggotaan: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tanggal_registrasi: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    }, {
        tableName: 'AnggotaPerpustakaan',
    });

    return AnggotaPerpustakaan;
};
