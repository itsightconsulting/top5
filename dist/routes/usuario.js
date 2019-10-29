"use strict";

var _usuario = _interopRequireDefault(require("../controller/usuario.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = require('express').Router(); // AuthController.js


var _require = require('../security/AuthService'),
    existeToken = _require.existeToken;

router.post('/', _usuario["default"].crearUsuario);
router.post('/validarEmail', _usuario["default"].validarEmail);
router.post('/login/facebook', _usuario["default"].loginFacebook);
router.post('/login', _usuario["default"].login);
router.post('/relogin', _usuario["default"].relogin);
router.post('/:id', existeToken, _usuario["default"].updateUsuario);
router.get('/getbyId/:id', existeToken, _usuario["default"].getOneUsuario);
router.post('/upload/:id', existeToken, _usuario["default"].uploadFile);
router.get('/conditions', existeToken, _usuario["default"].getTerminoyCondiciones);
module.exports = router;