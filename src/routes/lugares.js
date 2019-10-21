var router = require('express').Router();
const { existeToken } = require('../security/AuthService');
import routes from '../controller/lugar.routes';

// router.post('/', existeToken, routes.createdOrUpdatedLugar); // HUERFANO
// router.post('/getById', existeToken, routes.obtenerLugar); // HUERFANO
// router.post('/deleteById', existeToken, routes.eliminarLugar); // HUERFANO
router.post('/getAll', existeToken, routes.listarLugares);

module.exports = router;