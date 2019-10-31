"use strict";

var _categoria = require("../controller/categoria.routes");

var router = require('express').Router(); // AuthController.js


var _require = require('../security/AuthService'),
    existeToken = _require.existeToken;

router.get('/getAll', existeToken, _categoria.listarCategoria);
module.exports = router;