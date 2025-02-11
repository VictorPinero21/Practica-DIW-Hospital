// para poder hacer update en y comprobación en reset password
const resetPasswordService = require("./../services/resetPasswordService");

const ComprobarCorreo = async (req,res) =>{
    // recoger todos los correos
    const correos = await resetPasswordService.getCorreos(req.params.email)

    if(correos){
    // console.log("controlador: " + correos.email)
    // en caso de que coincida devolvemos el valor del correo
        res.send(correos)
    }else{
        // si no coincide devolvemos un null
        res.send({
            email: null
        })
    }
}

// el email se lo pasamos en req.params.email
const resetPassword = async (req,res) =>{
    // console.log('resetPassword');
    const user = await resetPasswordService.resetPassword(req.body.email);
    console.log("controlador " + user)
    res.status(200).send({
        data:user,
});
}


module.exports = {
    ComprobarCorreo,
    resetPassword
}