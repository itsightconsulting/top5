var router = require('express').Router();
const { existeToken } = require('../security/AuthService');

import routes from '../controller/top.routes';

router.post('/', existeToken, routes.createOrUpdateTop);
router.post('/listByUsuario', existeToken, routes.listarTopPorUsuario);
router.post('/publish', existeToken, routes.publicarTop);
router.post('/invalidate', existeToken, routes.eliminarTop);

router.post('/topItem/', existeToken, routes.createOrUpdateTopItem);
router.post('/topBylugarId/', existeToken, routes.listarTopByLugar);
router.post('/topItem/list/publish/', existeToken, routes.listarTopPublicadoPorUsuario);
router.post('/topItem/listByTop/', existeToken, routes.listarTopItemByTop);

router.post('/list/categoria', existeToken, routes.listarTopGeneral);
router.post('/list/lugar/categoria', existeToken, routes.listarTopByLugarByCategoria);
router.post('/detalle/list/top', existeToken, routes.listarTopDetallePorTop);
router.post('/detalle/delete', existeToken, routes.eliminarTopDetalle);
router.post('/list/usuario/categoria', existeToken, routes.listarTopPorUsuarioPorCategoria);
router.post('/list/usuario/autocomplete', existeToken, routes.listarTopPorUsuarioPorFiltro);

router.post('/getById/:id', existeToken, routes.getOneTop);

module.exports = router;