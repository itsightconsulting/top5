"use strict";

var _top = _interopRequireDefault(require("../controller/top.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = require('express').Router();

var _require = require('../security/AuthService'),
    existeToken = _require.existeToken;

router.post('/', existeToken, _top["default"].createOrUpdateTop);
router.post('/list/byUsuario', existeToken, _top["default"].listarTopPorUsuario);
router.post('/publish', existeToken, _top["default"].publicarTop);
router.post('/invalidate', existeToken, _top["default"].eliminarTop);
router.post('/topItem', existeToken, _top["default"].createOrUpdateTopItem);
router.post('/topItem/likes', existeToken, _top["default"].likesTopItem);
router.post('/topItem/list/published', existeToken, _top["default"].listarTopPublicadoPorUsuario);
router.post('/topItem/list/byTop', existeToken, _top["default"].listarTopItemByTop);
router.post('/topItem/list/byLugar', existeToken, _top["default"].listarTopItemByLugar);
router.post('/topItem/invalidate', existeToken, _top["default"].eliminarTopItem);
router.post('/topItem/getById/:id', existeToken, _top["default"].getOneTopItem);
router.post('/topItemDetalle/upload', existeToken, _top["default"].uploadFileTopItemDetalle);
router.post('/topItem/list/autocomplete', existeToken, _top["default"].listarOptionsAutocomplete);
router.post('/topItem/list/byfiltro', existeToken, _top["default"].listarTopItemAutocomplete);
router.post('/getById/:id', existeToken, _top["default"].getOneTop);
module.exports = router;