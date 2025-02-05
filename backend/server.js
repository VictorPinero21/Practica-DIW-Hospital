const bodyParser = require("body-parser");
const express = require('express');
const app = express();

// importamos la conexión a la base de datos 
const Sequelize = require("./config/db")


// conectar asociaciones
// require('./database/asociations')

//Setting del Puerto
const PORT = process.env.PORT || 5001;

//Middleware
//Para poder rellenar el req.body
app.use(bodyParser.json())
bodyParser.urlencoded({extended: false})

//Rutas   
const router = require("./routes/index");
app.use("/api", router);


//Arrancamos el servidor 
app.listen(PORT, () =>{
   console.log(`Servidor corriendo en http://localhost:${PORT}`)
   Sequelize.sync({force:false}).then(()=> console.log("conectado a concesionario"))
  });