const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sql12721109', 'sql12721109', 'MunU71qVE5', {
    host: 'sql12.freesqldatabase.com',
    dialect: 'mysql'
});

module.exports = sequelize;
