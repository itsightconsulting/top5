var router = require('express').Router();
// AuthController.js
const { existeToken } = require('../security/AuthService');

import {
    crearUsuario,
    loginFacebook,
    login,
    validarEmail,
    getOneUsuario,
    uploadFile,
    downloadFile
} from '../controller/usuario.routes';

router.post('/', crearUsuario);
router.post('/login/facebook', loginFacebook);
router.post('/login', login);
router.post('/validarEmail', validarEmail);
// router.post('/relogin', relogin);
router.get('/:id', existeToken, getOneUsuario);
// router.put('/:id', existeToken, updateUsuario);
router.post('/upload/:id', existeToken, uploadFile);
router.post('/download/:id', existeToken, downloadFile);

module.exports = router;