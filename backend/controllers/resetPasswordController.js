// para hasear la contraseña
const bcrypt = require("bcrypt");
// para poder hacer update en y comprobación en reset password
const resetPasswordService = require("./../services/resetPasswordService");

const ComprobarCorreo = async (req,res) =>{
     try {
        const correos = await resetPasswordService.getCorreos()
      } catch (error) {
        res.status(500).json({ error: error.message });
      }

      console.log(correos)
}

// el email se lo pasamos en req.params.email
const resetPassword = async (req,res) =>{
    console.log(resetPassword);
}


module.exports = {
    ComprobarCorreo,
    resetPassword
}