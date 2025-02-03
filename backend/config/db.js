const mysql = require('mysql2');
require('dotenv').config();

// Crear conexión con MySQL
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

// Conectar a MySQL
connection.connect((err) => {
  if (err) {
    console.error('🔴 Error conectando a MySQL:', err);
    process.exit(1);
  }
  console.log('🟢 Conectado a MySQL (PHPMyAdmin)');
});

module.exports = connection;
