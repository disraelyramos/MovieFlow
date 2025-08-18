const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menu.controller');

// Ruta: /api/menu/:role_id
router.get('/:role_id', menuController.obtenerMenuPorRol);

module.exports = router;
