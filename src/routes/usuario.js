import { Router } from 'express';
// AuthController.js
const { existeToken } = require('../security/AuthService');
const router = Router();

import {
    login, relogin
    , crearUsuario, getOneUsuario
    , updateUsuario, validarEmail
    , loginFacebook, uploadFile
    , downloadFile
} from '../controller/usuario.controller';

router.post('/', crearUsuario);
router.post('/facebook', loginFacebook);
router.post('/login', login);
router.post('/validarEmail', validarEmail);
router.post('/relogin', relogin);
router.get('/:id', existeToken, getOneUsuario);
router.put('/:id', existeToken, updateUsuario);
// router.post('/upload', existeToken, uploadFile);
router.post('/upload/:id', uploadFile);
router.post('/download/:id', downloadFile);
export default router;
