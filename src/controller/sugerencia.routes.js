import controller from '../controller/sugerencia.controller';
import { buildContainer, existeJsonData, controlError } from '../controller/common.controller';

async function createdOrUpdatedSugerencia(req, res) {
    try {
        existeJsonData(req, res);
        let response = await controller.createdOrUpdatedSugerencia(req.body.data);
        return res.status(200).send(response);
    } catch (error) {
        controlError("Crear sugerencia", error);
        res.status(500).send(buildContainer(false, 'Sucedio un error inesperado vuelva a intentar.', error, null));
    }
}
module.exports = {
    createdOrUpdatedSugerencia
}