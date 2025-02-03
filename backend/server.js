require('dotenv').config();
const express = require('express');
const db = require('./config/db');  // Importamos la conexión a MySQL

const app = express();

// Middleware para procesar JSON
app.use(express.json());

// Ruta de prueba para verificar conexión a MySQL
app.get('/', (req, res) => {
  db.query('SELECT 1', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error conectando a la base de datos' });
    } else {
      res.json({ message: 'API funcionando 🚀, conexión a MySQL establecida' });
    }
  });
});

// Puerto del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
