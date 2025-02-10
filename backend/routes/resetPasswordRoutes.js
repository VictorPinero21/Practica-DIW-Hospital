const router = require('express').Router();
const resetPasswordController = require('./../controllers/resetPasswordController')

router.get("/:email",resetPasswordController.ComprobarCorreo)
router.put("/",resetPasswordController.resetPassword)

module.exports = router;