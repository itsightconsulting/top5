var router = require('express').Router();
const { existeToken } = require('../security/AuthService');

import routes from '../controller/top.routes';

router.post('/', existeToken, routes.createOrUpdateTop);
router.post('/list/usuario', existeToken, routes.listarTopPorUsuario);
router.post('/list/categoria', existeToken, routes.listarTopGeneral);
router.post('/list/lugar/categoria', existeToken, routes.listarTopByLugarByCategoria);
router.post('/detalle/list/top', existeToken, routes.listarTopDetallePorTop);
router.post('/detalle/delete', existeToken, routes.eliminarTopDetalle);
router.post('/delete', existeToken, routes.eliminarTop);
router.post('/publicar', existeToken, routes.publicarTop);
router.post('/list/usuario/categoria', existeToken, routes.listarTopPorUsuarioPorCategoria);
router.post('/list/usuario/autocomplete', existeToken, routes.listarTopPorUsuarioPorFiltro);
router.post('/getById/:id', existeToken, routes.getOneTop);
module.exports = router;