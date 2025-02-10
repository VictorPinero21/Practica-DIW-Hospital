// para hasear la contraseña
const bcrypt = require("bcrypt");
// para poder hacer update en y comprobación en reset password
const resetPasswordService = require("./../services/resetPasswordService");

const ComprobarCorreo = async (req,res) =>{
    // recoger todos los correos
    const correos = await resetPasswordService.getCorreos(req.params.email)
    // comprobar si cpincide algun correo con el que mandamos
    // let index = correos.findIndex(correo => req.params.email == correo.email)
    // // devolver el correo que ha coincidido, si no coincide devuelve array vacio

    // let data = {

    // }

    // if(index !== -1){
    //     data = {
    //         'email':req.params.email
    //     }
    // }else{
    //     data = {
    //         'email':null
    //     }
    // }
    
    // res.send(data) 

    console.log(correos)

    if(correos){
    console.log("controlador: " + correos.email)
        res.send(correos)
    }else{
        res.send({
            email: null
        })
    }
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