const express = require('express');
const { getImagenes, crearImagen } = require('../controllers/imagenController');

const router = express.Router();

// Rutas de imágenes
router.get('/', getImagenes);
router.post('/', crearImagen);

module.exports = router;
