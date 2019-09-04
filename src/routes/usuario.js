import { Router } from 'express';
// AuthController.js
const { existeToken } = require('../security/AuthService');
const router = Router();

import { login, relogin, crearUsuario, getOneUsuario, updateUsuario } from '../controller/usuario.controller';

router.post('/', crearUsuario);
router.post('/login', login);
router.post('/relogin', existeToken, relogin);
router.get('/:id', existeToken, getOneUsuario);
router.put('/:id', existeToken, updateUsuario);

export default router;