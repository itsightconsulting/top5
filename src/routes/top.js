var router = require('express').Router();
const { existeToken } = require('../security/AuthService');

import routes from '../controller/top.routes';

router.post('/', existeToken, routes.createOrUpdateTop);
router.post('/list/byUsuario', existeToken, routes.listarTopPorUsuario);
router.post('/publish', existeToken, routes.publicarTop);
router.post('/invalidate', existeToken, routes.eliminarTop);

router.post('/topItem', existeToken, routes.createOrUpdateTopItem);

router.post('/topItem/list/published', existeToken, routes.listarTopPublicadoPorUsuario);
router.post('/topItem/list/byTop', existeToken, routes.listarTopItemByTop);
router.post('/topItem/list/byLugar', existeToken, routes.listarTopItemByLugar);
router.post('/topItem/invalidate', existeToken, routes.eliminarTopItem);
router.post('/topItem/getById/:id', existeToken, routes.getOneTopItem);

// router.post('/topItemDetalle/', existeToken, routes.createOrUpdateTopItemDetalle);
router.post('/topItemDetalle/upload', existeToken, routes.uploadFileTopItemDetalle);

// router.post('/list/categoria', existeToken, routes.listarTopGeneral); // HUERFANO
// router.post('/list/lugar/categoria', existeToken, routes.listarTopByLugarByCategoria); // HUERFANO
// router.post('/detalle/list/top', existeToken, routes.listarTopDetallePorTop); // HUERFANO
// router.post('/detalle/delete', existeToken, routes.eliminarTopDetalle);  // HUERFANO
// router.post('/list/usuario/categoria', existeToken, routes.listarTopPorUsuarioPorCategoria);  // HUERFANO
// router.post('/list/usuario/autocomplete', existeToken, routes.listarTopPorUsuarioPorFiltro); // HUERFANO

router.post('/getById/:id', existeToken, routes.getOneTop);

module.exports = router;