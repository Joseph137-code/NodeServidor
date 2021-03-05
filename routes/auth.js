const express         = require("express");
const {check}         = require("express-validator");

const authController  = require("../controllers/auth");
const auth            = require("../middleware/auth")

const router          = express.Router();

// Post /
router.post('/auth',
    [
        check('email', 'Agrega un email válido').isEmail(),
        check('password', 'El password no puede ir vacio').not().isEmpty()
    ],
authController.signup);

// GET/
router.get('/auth', auth,  authController.usuarioAutenticado);

module.exports = router;