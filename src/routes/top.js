var router = require('express').Router();
const { existeToken } = require('../security/AuthService');

import {
    crearTop,
    listarTopPorUsuario,
    listarTopDetallePorTop,
    eliminarTopDetalle,
    eliminarTop,
    listarTopPorUsuarioPorCategoria,
    listarTopPorUsuarioPorFiltro,
    publicarTop,
    listarTopGeneral,
    getOneTop
} from '../controller/top.routes';

router.post('/', existeToken, crearTop);
router.post('/list/usuario', existeToken, listarTopPorUsuario);
router.post('/list/categoria', existeToken, listarTopGeneral);
router.post('/detalle/list/top', existeToken, listarTopDetallePorTop);
router.post('/detalle/delete', existeToken, eliminarTopDetalle);
router.post('/delete', existeToken, eliminarTop);
router.post('/publicar', existeToken, publicarTop);
router.post('/list/usuario/categoria', existeToken, listarTopPorUsuarioPorCategoria);
router.post('/list/usuario/autocomplete', existeToken, listarTopPorUsuarioPorFiltro);
router.post('/getById/:id', existeToken, getOneTop);
module.exports = router;