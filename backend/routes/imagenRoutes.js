const router = require('express').Router();
const imagenController = require('../controllers/imagenController');


// Rutas de imágenes
router.get('/', imagenController.getImagenes);
router.post('/', imagenController.crearImagen);

module.exports = router;
