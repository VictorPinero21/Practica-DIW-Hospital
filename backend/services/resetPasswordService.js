const Usuario = require("./../database/models/Usuario");
const bcrypt = require("bcrypt");


// recoger todos los correos 
const getCorreos = async () => {
    try {
        return await Usuario.findAll({
            attributes: ['email']  // Selecciona solo el campo 'email'
        });
    } catch (error) {
        throw new Error("Error al pedir todos los correos: " + error.message);
    }
}

// actualizar contraseña por correo 
const resetPassword = (password, correo) => {
    try {
        // Encriptar la nueva contraseña
        bcrypt.hash(password, 10).then((hashedPassword) => {
            Usuario.update(
                { password: hashedPassword },
                { where: { email: correo } }
            )
        })
    } catch (error) {
        throw new Error("Error al modificar el usuario: " + error.message);
    }
}

module.exports = {
    getCorreos,
    resetPassword
}