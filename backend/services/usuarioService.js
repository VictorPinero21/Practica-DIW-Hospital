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

const comprobarUsuario=async(email,password)=>{
  try{
      // console.log(email,pasword)
        const usuario=await Usuario.findOne({where:{email:email}})
        console.log("USUARIO:"+usuario.email+usuario.password)
        //Compamos la contraseña de ese usuario con la contraseña enviada, la desencriptamos
        const pass=await bcrypt.compare(password, usuario.password);
        console.log("Contraseña"+pass)
        
        return {status:200}
       
         
      
    }catch(error){
     throw new Error("Error al comprobar")
    }
}
module.exports = {
  getUsuarios,
  getUsuarioById,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  comprobarUsuario,
};