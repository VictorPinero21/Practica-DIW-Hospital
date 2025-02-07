const Usuario = require("./../database/models/Usuario");

const getUsuarios = async () => {
  try {
    return await Usuario.findAll();
  } catch (error) {
    throw new Error("Error al pedir todos los usuarios: " + error.message);
  }
};

const getUsuarioById = async (id) => {
  try {
    return await Usuario.findByPk(id);
  } catch (error) {
    throw new Error("Error al pedir un usuario por id: " + error.message);
  }
};

const crearUsuario = async (usuarioData) => {
  try {
    return await Usuario.create(usuarioData);
  } catch (error) {
    throw new Error("Error al crear el usuario: " + error.message);
  }
};

const actualizarUsuario = async (id, usuarioData) => {
  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      throw new Error("Usuario no encontrado");
    }
    return await usuario.update(usuarioData);
  } catch (error) {
    throw new Error("Error al modificar el usuario: " + error.message);
  }
};

const eliminarUsuario = async (id) => {
  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      throw new Error("El usuario no existe");
    }
    return await usuario.destroy();
  } catch (error) {
    throw new Error("Error al borrar el usuario: " + error.message);
  }
};

module.exports = {
  getUsuarios,
  getUsuarioById,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
};