const express = require('express');
const { getUsuarios, getUsuarioById, crearUsuario, actualizarUsuario, eliminarUsuario } = require('../controllers/usuarioController');

const router = express.Router();

//Rutas de Usuarios
router.get('/', getUsuarios);              
router.get('/:id', getUsuarioById);       
router.post('/', crearUsuario);           
router.put('/:id', actualizarUsuario);   
router.delete('/:id', eliminarUsuario);

module.exports = router;