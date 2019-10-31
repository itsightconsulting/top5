"use strict";

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