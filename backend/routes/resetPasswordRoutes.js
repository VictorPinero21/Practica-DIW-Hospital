const router = require('express').Router();
const resetPasswordController = require('./../controllers/resetPasswordController')

router.get("/",resetPasswordController.ComprobarCorreo)
router.put("/:email",resetPasswordController.resetPassword)

module.exports = router;