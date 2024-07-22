const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Akun', {
        username: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
          type: DataTypes.ENUM('user', 'admin'),
          defaultValue: 'user',
          allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        }
    }, {
        tableName: 'Akun',
    });
};
