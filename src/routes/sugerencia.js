var router = require('express').Router();
const { existeToken } = require('../security/AuthService');
import routes from '../controller/sugerencia.routes';

router.post('/', existeToken, routes.createdOrUpdatedSugerencia);

module.exports = router;