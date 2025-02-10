const Usuario = require("./../database/models/Usuario");
const bcrypt = require("bcrypt");


// recoger todos los correos 
const getCorreos = async (email) => {
    const project = await Usuario.findOne({ where: { email: email } });

if (project === null) {
  console.log('Not found!');
} else {
  console.log(project.email);
}

return project;
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