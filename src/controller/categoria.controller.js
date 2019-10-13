import models from '../orm.database/models/index';
import { buildContainer } from './common.controller';
const CategoriaDTO = models.Categoria;

async function listarCategoria() {
    try {
        let response = null;
        let categoriaBDList = await CategoriaDTO.findAll({
            where: {
                flagActive: true,
                flagEliminate: false,
            }, attributes: ['id', 'name', 'rutaImagenPrincipal']
            , order: [['nroOrden', 'ASC']]
        });
        let data = { total: categoriaBDList.length, datos: categoriaBDList };
        response = buildContainer(true, null, data, null);
        return response;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    listarCategoria
}