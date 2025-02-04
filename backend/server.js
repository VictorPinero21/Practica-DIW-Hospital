const express = require('express');
const app = express();
require('dotenv').config();
//Setting del Puerto
const PORT = process.env.PORT || 5001;
//Importar modelos
const { sequelize, Usuario, Cassette, Muestra, Imagen } = require('./models'); 



//Middleware
//Para poder rellenar el req.body
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//Rutas   
app.get('/', (req, res) => {
  res.json({ message: 'API funcionando 🚀' });
});

//Arrancamos el servidor 
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
/*
// Importar rutas
const usuarioRoutes = require('./routes/usuarioRoutes');
const cassetteRoutes = require('./routes/cassetteRoutes');
const muestraRoutes = require('./routes/muestraRoutes');
const imagenRoutes = require('./routes/imagenRoutes');
//Usar las rutas
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/cassettes', cassetteRoutes);
app.use('/api/muestras', muestraRoutes);
app.use('/api/imagenes', imagenRoutes);
*/


sequelize.sync({ force: false }).then(() => { // 👈 Cambia `false` a `true` SOLO PARA PRUEBAS
  console.log('📌 Base de datos sincronizada con MySQL');
});



