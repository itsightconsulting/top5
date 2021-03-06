var router = require('express').Router();
// AuthController.js
const { existeToken } = require('../security/AuthService');
import { listarCategoria } from '../controller/categoria.routes';

router.get('/getAll', existeToken, listarCategoria);

module.exports = router;