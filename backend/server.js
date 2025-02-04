require('dotenv').config();
const express = require('express');
const { sequelize, Usuario, Cassette, Muestra, Imagen } = require('./models'); // 👈 Importamos los modelos correctamente

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5001;
sequelize.sync({ force: false }).then(() => { // 👈 Cambia `false` a `true` SOLO PARA PRUEBAS
  console.log('📌 Base de datos sincronizada con MySQL');
});


app.get('/', (req, res) => {
  res.json({ message: 'API funcionando 🚀' });
});

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
