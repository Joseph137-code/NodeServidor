const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');


const User = require('../models/Usuario');

exports.signup =  async (req, res, next) => {
   // Mostrar mensajes de error de express validator
   const errores = validationResult(req);
   if(!errores.isEmpty()) {
       return res.status(400).json({errores: errores.array()});
   }
  const email = req.body.email;
  const nombre = req.body.nombre;
  const password = req.body.password;

  let usuario = await User.findOne({ email });

  if(usuario) {
        return res.status(400).json({ message: 'El usuario ya esta registrado' });
  }
  bcrypt
    .hash(password, 12)
    .then(hashedPw => {
      const user = new User({
        email: email,
        password: hashedPw,
        nombre: nombre
      });
      return user.save();
    })
    .then(result => {
      res.status(201).json({ message: 'User created!', userId: result._id });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
