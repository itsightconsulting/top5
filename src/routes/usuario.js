import { Router } from 'express';
const router = Router();

import { login, relogin, crearUsuario, getOneUsuario, updateUsuario } from '../controller/usuario.controller';

router.post('/', crearUsuario);
router.post('/login', login);
router.post('/relogin', relogin);
router.get('/:id', getOneUsuario);
router.put('/:id', updateUsuario);

export default router;