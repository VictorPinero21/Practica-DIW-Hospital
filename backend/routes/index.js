const express = require("express");
const router = express.Router();
const middleware = require("../middlewares/middlewares");
const imagenRoutes = require("./imagenRoutes");
const casseteRoutes = require("./cassetteRoutes");
const muestraRoutes = require("./muestraRoutes");
const usuarioRoutes = require("./usuarioRoutes");
const resetPasswordRoutes = require("./resetPasswordRoutes");

router.use("/imagen",middleware.checkToken,  imagenRoutes);
router.use("/cassete", middleware.checkToken, casseteRoutes);
router.use("/muestra",middleware.checkToken,   muestraRoutes);
router.use("/usuario", usuarioRoutes);
router.use("/reset",resetPasswordRoutes)

module.exports = router;