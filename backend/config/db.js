const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  dialectModule: require('mysql2'),
  logging: false,
});

sequelize.authenticate()
  .then(() => console.log('✅ Conexión a MySQL con Sequelize establecida'))
  .catch(err => console.error('❌ Error al conectar con MySQL:', err));

module.exports = sequelize;
