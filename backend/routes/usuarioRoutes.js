const express = require('express').Router();
const usuarioController = require('../controllers/usuarioController');


//Rutas de Usuarios
router.get('/', usuarioController.getUsuarios);              
router.get('/:id', usuarioController.getUsuarioById);       
router.post('/', usuarioController.crearUsuario);           
router.put('/:id', usuarioController.actualizarUsuario);   
router.delete('/:id', usuarioController.eliminarUsuario);

module.exports = {router};