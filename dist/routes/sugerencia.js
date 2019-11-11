"use strict";

var _sugerencia = _interopRequireDefault(require("../controller/sugerencia.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = require('express').Router();

var _require = require('../security/AuthService'),
    existeToken = _require.existeToken;

router.post('/', existeToken, _sugerencia["default"].createdOrUpdatedSugerencia);
module.exports = router;