"use strict";

<<<<<<< HEAD
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _usuario = require("../controller/usuario.controller");

// AuthController.js
var _require = require('../security/AuthService'),
    existeToken = _require.existeToken;

var router = (0, _express.Router)();
router.post('/', _usuario.crearUsuario);
router.post('/login', _usuario.login);
router.post('/relogin', existeToken, _usuario.relogin);
router.get('/:id', existeToken, _usuario.getOneUsuario);
router.put('/:id', existeToken, _usuario.updateUsuario);
var _default = router;
exports["default"] = _default;
=======
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
>>>>>>> 0d766ade1273b645a073fa0b0e856cfb9edd9a5a
