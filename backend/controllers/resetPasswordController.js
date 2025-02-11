// para poder hacer update en y comprobación en reset password
const resetPasswordService = require("./../services/resetPasswordService");
const jwt = require('jwt-simple')
const moment = require('moment')
const bcrypt = require("bcrypt");
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;

const createToken = (user) => {
    const payload = {
        usuario: user.id,
        createdAt: moment().unix(),
        expiredAt: moment().add(5,'minutes').unix()
    }
    
    return jwt.encode(payload,jwtSecret);
    
    }
    

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

const ComprobarCorreo2 = async (req , res)=> {
    const correos = await resetPasswordService.getCorreos(req.body.email)
    
    if(correos){
        const iguales = bcrypt.compareSync(req.body.password, correos.password);
        if(iguales){
            res.json( {success:createToken(correos)})
        }else{
            res.json({error: 'Error en usuario y/o contraseña'})
        }
    }else{
        res.json({error: 'Error en usuario y/o contraseña'})
    }
}


module.exports = {
    ComprobarCorreo,
    resetPassword,
    ComprobarCorreo2
}