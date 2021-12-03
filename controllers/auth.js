const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env'});

const User = require('../models/Usuario');

exports.signup = async (req, res, next) => {
    // Mostrar mensajes de error de express validator
   const errores = validationResult(req);
   if(!errores.isEmpty()) {
       return res.status(400).json({errores: errores.array()});
   }

   // Buscar el usuario para ver si esta registrado
   const { email, password } = req.body;
   const user = await User.findOne({ email });
   // console.log(usuario);

   if (!user) {
       res.status(401).json({ msg: 'El Usuario No Existe' });
       return next();
   }

    // Verificar el password y autenticar el usuario
    if (bcrypt.compareSync(password, user.password)) {
        // Crear JWT
        const token = jwt.sign({
            id: user._id,
            nombre: user.nombre,
            email: user.email
        }, process.env.SECRETA, {
            expiresIn: '8h'
        });

        res.json({ token })

    } else {
        res.status(401).json({ msg: "Password Incorrecto" });
        return next();
    }

}

exports.usuarioAutenticado = (req, res, next) => {
    const authHeader = req.get("Authorization");
    if(authHeader){
        //Obtener Token
        const token = authHeader.split(" ")[1];

        //Comprobar el JWT
        try {
            const usuario = jwt.verify(token.process.env.SECRETA);
            res.json({usuario})
        } catch (error) {
            console.log(error);
            console.log("JWT No Valido")
        }
    }
    return next();
}