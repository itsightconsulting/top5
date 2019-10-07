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
router.post('/login/facebook', loginFacebook);
router.post('/login', login);
router.post('/validarEmail', validarEmail);
// router.post('/relogin', relogin);
router.get('/getbyId/:id', existeToken, getOneUsuario);
router.post('/upload/:id', existeToken, uploadFile);
router.post('/download/:id', existeToken, downloadFile);
router.post('/rules', existeToken, getTerminoyCondiciones);


router.post('/:id', existeToken, updateUsuario);
module.exports = router;