const express = require('express');
const { getCassettes, getCassetteById, crearCassette, actualizarCassette, eliminarCassette } = require('../controllers/cassetteController');

const router = express.Router();

// Rutas de cassettes
router.get('/', getCassettes);
router.get('/:id', getCassetteById);
router.post('/', crearCassette);
router.put('/:id', actualizarCassette);
router.delete('/:id', eliminarCassette);

module.exports = router;
