const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors=require("cors")
// importamos la conexión a la base de datos 
require('dotenv').config();

const { sequelize, Usuario, Cassette, Muestra, Imagen } = require('./database/models'); 

// conectar asociaciones
// require('./database/asociations')

//Setting del Puerto
const PORT = process.env.PORT || 5001;

//Middleware
//Para poder rellenar el req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

//Rutas   
const router = require("./routes/index");
app.use("/api", router);
 app.use(cors({
   origin: "*",  // Permite cualquier origen
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "user-token"]
 }));


//  app.use(cors());



//Arrancamos el servidor 
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));

sequelize.sync({ force: false }).then(() => { // 👈 Cambia `false` a `true` SOLO PARA PRUEBAS
  console.log('📌 Base de datos sincronizada con MySQL');
});

