const express = require("express");
const router = express.Router();

const imagenRoutes = require('./imagenRoutes');
const casseteRoutes = require('./cassetteRoutes');
const muestraRoutes = require('./muestraRoutes');
const usuarioRoutes = require('./usuarioRoutes');

router.use("/imagen",imagenRoutes)
router.use("/cassete",casseteRoutes)
router.use("/muestra",muestraRoutes)
router.use("/usuario",usuarioRoutes)


module.exports = router;
