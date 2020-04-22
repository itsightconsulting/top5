var router = require('express').Router();
const { existeToken } = require('../security/AuthService');

import routes from '../controller/top.routes';

router.post('/', existeToken, routes.createOrUpdateTop);
<<<<<<< HEAD
<<<<<<< HEAD
=======
router.post('/orderItems', existeToken, routes.updateOrderItems);
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
=======
router.post('/orderItems', existeToken, routes.updateOrderItems);
>>>>>>> 9146d82c96a3be7f6058b84a736c299879787d42
router.post('/list/byUsuario', existeToken, routes.listarTopPorUsuario);
router.post('/publish', existeToken, routes.publicarTop);
router.post('/invalidate', existeToken, routes.eliminarTop);

router.post('/topItem', existeToken, routes.createOrUpdateTopItem);

router.post('/topItem/likes', existeToken, routes.likesTopItem);
router.post('/topItem/list/published', existeToken, routes.listarTopPublicadoPorUsuario);
router.post('/topItem/list/byTop', existeToken, routes.listarTopItemByTop);
router.post('/topItem/list/byLugar', existeToken, routes.listarTopItemByLugar);
router.post('/topItem/invalidate', existeToken, routes.eliminarTopItem);
router.post('/topItem/getById/:id', existeToken, routes.getOneTopItem);

router.post('/topItemDetalle/upload', existeToken, routes.uploadFileTopItemDetalle);

router.post('/topItem/list/autocomplete', existeToken, routes.listarOptionsAutocomplete);
router.post('/topItem/list/byfiltro', existeToken, routes.listarTopItemAutocomplete);
router.post('/getById/:id', existeToken, routes.getOneTop);

module.exports = router;