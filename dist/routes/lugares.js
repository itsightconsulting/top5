"use strict";

var _lugar = _interopRequireDefault(require("../controller/lugar.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = require('express').Router();

var _require = require('../security/AuthService'),
    existeToken = _require.existeToken;

// router.post('/', existeToken, routes.createdOrUpdatedLugar); // HUERFANO
// router.post('/getById', existeToken, routes.obtenerLugar); // HUERFANO
// router.post('/deleteById', existeToken, routes.eliminarLugar); // HUERFANO
router.post('/getAll', existeToken, _lugar["default"].listarLugares);
module.exports = router;