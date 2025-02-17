const router = require('express').Router();
const imagenController = require('../controllers/imagenController');


// Rutas de imágenes
router.get('/', imagenController.getImagenes);
router.get('/:id', imagenController.getImagenById);
router.post('/', imagenController.crearImagen);
router.put('/:id',imagenController.actualizarImagen);
router.delete('/:id',imagenController.eliminarImagen);


module.exports = router;
