//getUsuarios, getUsuarioById, crearUsuario, actualizarUsuario, eliminarUsuario
//El Victor del pasado le dice a la Estela del futuro que los nombres de los controladores sean asi ma o meno que para las rutas me hacen falta parece ser
const bcrypt = require("bcrypt");

const usuarioService = require("./../services/usuarioService");

// Obtener todos los usuarios
const getUsuarios = async (req, res) => {
  try {
    const usuarios = await usuarioService.getUsuarios();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un usuario por ID
const getUsuarioById = async (req, res) => {
  try {
    const usuarios = await usuarioService.getUsuarioById(req.params.id);
    if (usuario) {
      res.status(200).json(usuario);
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo usuario
const crearUsuario = async (req, res) => {
  try {
    const createdUsuario = await usuarioService.crearUsuario({
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      email: req.body.email,
      // password: bcrypt.hashSync(req.body.password, 10),
      password: req.body.password,
      centro: req.body.centro,
      rol: req.body.rol,
    });
    res.status(201).json(createdUsuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un usuario existente
const actualizarUsuario = async (req, res) => {
  try {
    const updatedUsuario = await usuarioService.actualizarUsuario({
      id: req.params.id,
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      email: req.body.email,
      password: req.body.password,
      centro: req.body.centro,
      rol: req.body.rol,
    });
    if (updatedUsuario) {
      res.status(200).json(updatedUsuario);
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un usuario
const eliminarUsuario = async (req, res) => {
  try {
    const deleted = await usuarioService.eliminarUsuario(req.params.id);
    if (deleted) {
      res.status(204).json({ message: "Usuario eliminado" });
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getUsuarios,
  getUsuarioById,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
};