const express            = require('express');
const router             = express.Router();
const archivosController = require('../controllers/archivos');
const auth               = require('../middleware/auth');

router.post('/archivos',
    auth,
    archivosController.subirArchivo
);

router.get('/archivos/:archivo',
    archivosController.descargar,
    archivosController.eliminarArchivo,
);

module.exports = router;