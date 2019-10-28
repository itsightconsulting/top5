import controller from '../controller/categoria.controller';
import { buildContainer, controlError } from '../controller/common.controller';

async function listarCategoria(req, res) {
    try {
        let response = await controller.listarCategoria();
        return res.status(200).send(response);
    } catch (error) {
        controlError("listarCategoria", error);
        res.status(500).send(buildContainer(false, 'Sucedio un error inesperado vuelva a intentar.', null, null));
    }
}

module.exports = {
    listarCategoria
}