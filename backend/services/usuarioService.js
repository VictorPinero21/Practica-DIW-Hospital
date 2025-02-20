const Usuario = require("./../database/models/Usuario");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
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

const comprobarUsuario = async (email, password) => {
  try {
    console.log("🔍 Buscando usuario con email:", email);

    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      console.log("❌ Usuario no encontrado");
      return { status: 404, error: "Error en usuario y/o contraseña" };
    }

    console.log("✅ Usuario encontrado:", usuario.email);
    console.log("🔑 Comparando contraseñas...");

    const iguales = bcrypt.compareSync(password, usuario.password);

    console.log("⚖️ Resultado comparación:", iguales);  

    if (!iguales) {
      console.log("❌ Contraseña incorrecta");
      return { status: 401, error: "Error en usuario y/o contraseña" };
    }

    console.log("🔐 Contraseña correcta, generando token...");
    const token = createToken(usuario); 

    return { status: 200, success: token };
  } catch (error) {
    console.error("💥 Error en comprobarUsuario:", error);
    return { status: 500, error: "Error al comprobar", details: error.message };
  }
};

const createToken = (user) => {
  const payload = {
    usuarioId: user.id,
    usuarioRol: user.rol,
    createdAt: moment().unix(),
    expiresAt: moment().add(5, "minutes").unix(),
  };

  return jwt.encode(payload, "frase secreta");
};


module.exports = {
  getUsuarios,
  getUsuarioById,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  comprobarUsuario,
};