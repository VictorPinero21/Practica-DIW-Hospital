const router = require('express').Router();
const muestraController = require('../controllers/muestraController');


// Rutas de muestras
router.get('/', muestraController.getMuestras);
router.post('/', muestraController.crearMuestra);
router.put('/:id', muestraController.actualizarMuestra);
router.delete('/:id', muestraController.eliminarMuestra);
// recoger las muestras de 1 cassete
router.get('/cassette/:id', muestraController.getMuestraByIdCassete);
router.get('/:id', muestraController.getMuestraById);

module.exports = router;
