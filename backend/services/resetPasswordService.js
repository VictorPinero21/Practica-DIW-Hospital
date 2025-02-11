const Usuario = require("./../database/models/Usuario");
const bcrypt = require("bcrypt");
let generator=require('generate-password-browser');

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
const resetPassword = (correo) => {

    do {
        passwd = generator.generate({
            length: 8,
            numbers: true,
            symbols: true,
            lowercase: true,
            uppercase: true,
        });
    } while (
        !/[0-9]/.test(passwd) ||   
        !/[!@#$%^&*(),.?":{}|<>]/.test(passwd) || 
        !/[A-Z]/.test(passwd) ||   
        !/[a-z]/.test(passwd)      
    );

    try {
        // Encriptar la nueva contraseña
        bcrypt.hash(passwd, 10).then((hashedPassword) => {
            Usuario.update(
                { password: hashedPassword },
                { where: { email: correo } }
            )
        })
        console.log("servicio " + passwd)
        return passwd;
    } catch (error) {
        throw new Error("Error al modificar el usuario: " + error.message);
    }
}

module.exports = {
    getCorreos,
    resetPassword
}