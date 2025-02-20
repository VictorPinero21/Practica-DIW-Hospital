const router = require('express').Router();
const usuarioController = require('../controllers/usuarioController');
const { checkToken, verificarRol } = require("../middlewares/middlewares");
//Rutas de Usuarios
router.get("/info", checkToken, (req, res) => {
    verificarRol(req, res);
  });
router.post('/login',usuarioController.comprobarUsuario)   
router.get('/', usuarioController.getUsuarios);              
router.get('/:id', usuarioController.getUsuarioById);       
router.post('/', usuarioController.crearUsuario);
router.put('/:id', usuarioController.actualizarUsuario);   
router.delete('/:id', usuarioController.eliminarUsuario);



module.exports = router;
