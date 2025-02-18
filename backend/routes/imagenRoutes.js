const router = require('express').Router();
const imagenController = require('../controllers/imagenController');

const multer = require('multer')
// Configurar Multer para guardar en memoria antes de enviarlo a la BD
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Rutas de imágenes
router.get('/', imagenController.getImagenes);
router.get('/:id', imagenController.getImagenById);
router.post('/', upload.single("imagen"),imagenController.crearImagen);
router.put('/:id',imagenController.actualizarImagen);
router.delete('/:id',imagenController.eliminarImagen);
// coger las imagenes de una muestra en concreto
router.get('/muestra/:id',imagenController.getImagenByMuestra)


module.exports = router;
