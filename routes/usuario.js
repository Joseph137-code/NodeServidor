const express           = require("express");
const {check}           = require("express-validator");
const usuarioController = require("../controllers/usuario");
const router            = express.Router();

// Post /
router.post('/usuario',[
    check('nombre', 'El Nombre es Obligatorio').not().isEmpty(),
    check('email', 'Agrega un email válido').isEmail(),
    check('password', 'El password debe ser de al menos 6 caracteres').isLength({min: 6}),
] ,usuarioController.signup);

module.exports = router;