var router = require('express').Router();
// AuthController.js
const { existeToken } = require('../security/AuthService');

import routes from '../controller/usuario.routes';

router.post('/', routes.crearUsuario);
router.post('/validarEmail', routes.validarEmail);
router.post('/login/facebook', routes.loginFacebook);
router.post('/login', routes.login);
router.post('/relogin', routes.relogin);
router.post('/:id', existeToken, routes.updateUsuario);
router.get('/getbyId/:id', existeToken, routes.getOneUsuario);
router.post('/upload/:id', existeToken, routes.uploadFile);
// router.post('/download/:id', existeToken, routes.downloadFile); // HUERFANO
router.get('/conditions', existeToken, routes.getTerminoyCondiciones);

module.exports = router;