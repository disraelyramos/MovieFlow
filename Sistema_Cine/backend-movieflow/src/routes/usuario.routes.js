const express = require('express');
const router = express.Router();
const controlador = require('../controllers/nuevousuario.controller');


const usuarioController = require('../controllers/usuario.controller');
// POST /api/usuario  ← ya montado en app.use('/api/usuario', ...)
router.post('/', controlador.registrarUsuario);

// GET /api/usuario/usuarios
router.get('/usuario', usuarioController.getUsuarios);



module.exports = router;
