const express           = require('express');
const router            = express.Router();
const enlacesController = require("../controllers/enlace");
const { check }         = require('express-validator');
const auth              = require('../middleware/auth');

router.post('/enlaces',
    [
        check('nombre', 'Sube un archivo').not().isEmpty(),
        check('nombre_original', 'Sube un archivo').not().isEmpty()
    ],      
    auth,
    enlacesController.nuevoEnlace
);

router.get('/enlaces',
    enlacesController.todosEnlaces
);


router.get('/enlaces/:url',
    enlacesController.tienePassword,
    enlacesController.obtenerEnlace,
);


router.post('/enlaces/:url', 
    enlacesController.verificarPassword,
    enlacesController.obtenerEnlace,
)

module.exports = router;