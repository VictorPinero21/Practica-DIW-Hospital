// para hasear la contraseña
const bcrypt = require("bcrypt");
// para poder hacer update en y comprobación en reset password
const resetPasswordService = require("./../services/resetPasswordService");

const ComprobarCorreo = async (req,res) =>{
    // recoger todos los correos
    const correos = await resetPasswordService.getCorreos()
    // comprobar si cpincide algun correo con el que mandamos
    let index = correos.filter(correo => req.params.email == correo.email)
    // devolver el correo que ha coincidido, si no coincide devuelve array vacio
    res.send(index)  
}

// el email se lo pasamos en req.params.email
const resetPassword = async (req,res) =>{
    // console.log('resetPassword');
    const user = await resetPasswordService.resetPassword(req.body.password , req.params.email);

    res.status(200).send(user);
}


module.exports = {
    ComprobarCorreo,
    resetPassword
}