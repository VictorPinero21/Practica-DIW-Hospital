const express = require('express');
const { getMuestras, crearMuestra } = require('../controllers/muestraController');

const router = express.Router();

// Rutas de muestras
router.get('/', getMuestras);
router.post('/', crearMuestra);

module.exports = router;
