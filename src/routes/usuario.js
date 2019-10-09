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
    downloadFile,
    updateUsuario,
    getTerminoyCondiciones
} from '../controller/usuario.routes';

router.post('/', crearUsuario);
router.post('/validarEmail', validarEmail);
router.post('/login/facebook', loginFacebook);
router.post('/login', login);
router.post('/:id', existeToken, updateUsuario);
router.get('/getbyId/:id', existeToken, getOneUsuario);
router.post('/upload/:id', existeToken, uploadFile);
router.post('/download/:id', existeToken, downloadFile);
router.get('/conditions', existeToken, getTerminoyCondiciones);

module.exports = router;