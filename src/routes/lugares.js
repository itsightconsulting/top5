var router = require('express').Router();
const { existeToken } = require('../security/AuthService');
import {
    crearLugar,
    obtenerLugar,
    eliminarLugar,
    obtenerLugarPorUbicacion,
    listarLugares
} from '../controller/lugar.routes';

router.post('/', existeToken, crearLugar);
router.post('/getById', existeToken, obtenerLugar);
router.post('/deleteById', existeToken, eliminarLugar);
router.post('/getByLocation', existeToken, obtenerLugarPorUbicacion);
router.post('/getAll', existeToken, listarLugares);

module.exports = router;