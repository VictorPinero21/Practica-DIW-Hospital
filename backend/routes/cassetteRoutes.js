const router = require('express').Router();
const casseteRoutes = require('../controllers/cassetteController');


// Rutas de cassettes
router.get('/', casseteRoutes.getCassettes);
router.get('/:id', casseteRoutes.getCassetteById);
router.post('/', casseteRoutes.crearCassette);
router.put('/:id', casseteRoutes.actualizarCassette);
router.delete('/:id', casseteRoutes.eliminarCassette);

module.exports = router;
