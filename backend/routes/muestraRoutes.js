const router = require('express').Router();
const muestraController = require('../controllers/muestraController');


// Rutas de muestras
router.get('/', muestraController.getMuestras);
router.post('/', muestraController.crearMuestra);

module.exports = {router};
