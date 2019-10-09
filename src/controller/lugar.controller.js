import models from '../orm.database/models/index';
import util from '../utilitarios/utilitarios';
import { buildContainer } from './common.controller';
const LugarDTO = models.Lugar;

async function obtenerLugar(id) {
    try {
        let lugarBD = await LugarDTO.findOne({
            where: {
                id
            }
            , order: [['updatedAt', 'DESC']]
        });
        return lugarBD;
    } catch (error) {
        throw error;
    }
}
async function crearLugar(data) {
    try {
        let response = null;
        let lugarBD = null;
        const { name, latitude, longitude } = data;
        if (data.id) {
            // lugarBD = await obtenerLugar(data.LugarId);
            // if (lugarBD) {
            await lugarBD.update({
                name
                , latitude
                , longitude
                , flagActive: true
                , flagEliminate: false
                , updatedAt: util.get_Date()
            }, {
                where: {
                    id: data.id
                }
            });
            // }
        } else {
            lugarBD = await LugarDTO.create({
                name
                , latitude
                , longitude
                , flagActive: true
                , flagEliminate: false
                , createdAt: util.get_Date()
                , updatedAt: util.get_Date()
            }, {
                fields: ['name', 'latitude', 'longitude', 'flagActive', 'flagEliminate', 'createdAt', 'updatedAt']
            });

        }

        if (lugarBD) {
            response = buildContainer(true, 'Top creado correctamente.', null, token);
        }

        if (response === null) {
            throw new Error('No se pudo crear lugar');
        }
        return response;
    } catch (error) {
        throw error;
    }
}
async function eliminarLugar(id) {
    try {
        let response = null;
        let lugarBd = null;
        if (id) {
            // lugarBd = await obtenerLugar(id);
            // if (lugarBd) {
            await lugarBd.update({
                flagActive: false
                , flagEliminate: true
                , updatedAt: util.get_Date()
            });
            response = buildContainer(true, 'Eliminado correctamente.', null, null);
            // }
        }
        if (response === null) {
            throw new Error('No se pudo eliminar lugar');
        }
        return response;
    } catch (error) {
        throw error;
    }
}
async function obtenerLugarPorUbicacion(latitude, longitude) {
    try {
        let response = null;
        let lugarBdListado = await LugarDTO.findAll({
            where: {
                latitude,
                longitude,
                flagActive: true
            }, order: [['updatedAt', 'DESC']]
        });
        let data = { total: lugarBdListado.length, datos: lugarBdListado };
        response = buildContainer(true, null, data, null);
        return response;
    } catch (error) {
        throw error;
    }
}
async function listarLugares(pagina, cantidad) {
    try {
        let response = null;
        let lugarBDList = await LugarDTO.findAll({
            where: { flagActive: true, flagEliminate: false },
            attributes: ['name', 'latitude', 'longitude'],
            order: [['updatedAt', 'DESC']]
        });
        let data = { total: lugarBDList.length, datos: lugarBDList };
        response = buildContainer(true, null, data, null);
        return response;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    crearLugar,
    obtenerLugar,
    eliminarLugar,
    obtenerLugarPorUbicacion,
    listarLugares
}