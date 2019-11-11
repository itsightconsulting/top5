import models from '../orm.database/models/index';
import { buildContainer } from './common.controller';
const SugerenciaDTO = models.Sugerencia;

async function createdOrUpdatedSugerencia(objSugerencia) {
    try {
        let queryObject = {
            descripcion: objSugerencia.descripcion
            , flagActive: true
            , flagEliminate: false
            , updatedAt: objSugerencia.updatedAt
        };

        if (objSugerencia.id) {
            queryObject.updatedBy = objSugerencia.createdBy;
            await SugerenciaDTO.update(queryObject, { where: { id: objSugerencia.id } });
            var dataValues = objSugerencia;
        } else {
            queryObject.createdBy = objSugerencia.createdBy;
            queryObject.createdAt = objSugerencia.createdAt;

            var { dataValues } = await SugerenciaDTO.create(queryObject, {
                fields: ['descripcion', 'flagActive', 'flagEliminate', 'updatedAt', 'createdBy', 'createdAt']
            });
        }
        return buildContainer(true, '', dataValues, null);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createdOrUpdatedSugerencia
}