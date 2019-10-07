import models from '../orm.database/models/index';
import util from '../utilitarios/utilitarios';
import { buildContainer } from './common.controller';
const LugarDTO = models.Lugar;

async function obtenerLugar(id) {
    try {
        let lugarBD = await LugarDTO.findOne({
            where: {
                LugarId: id
            }
            , order: [['FechaCreacion', 'DESC']]
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
        const { Nombre, Latitud, Longitud, Tipo, FlagProcedenciaGoogleMaps, Descripcion } = data;
        if (data.LugarId) {
            lugarBD = await obtenerLugar(data.LugarId);
            if (lugarBD) {
                await lugarBD.update({
                    Nombre
                    , Latitud
                    , Longitud
                    , Tipo
                    , FlagProcedenciaGoogleMaps
                    , Descripcion
                    , FlagActivo: true
                    , FlagEliminado: false
                    , ModificadoPor: data.ModificadoPor
                    , FechaModificacion: util.get_Date()
                });
            }

        } else {
            lugarBD = await LugarDTO.create({
                Nombre
                , Latitud
                , Longitud
                , Tipo
                , FlagProcedenciaGoogleMaps
                , Descripcion
                , FlagActivo: true
                , FlagEliminado: false
                , CreadoPor: objTop.CreadoPor
                , FechaCreacion: util.get_Date()
            }, {
                fields: ['Nombre', 'Latitud', 'Longitud', 'Tipo', 'FlagProcedenciaGoogleMaps', 'Descripcion', 'FlagActivo', 'FlagEliminado', 'CreadoPor', 'FechaCreacion']
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
        console.log("controller crearTop(error):", error);
        throw error;
    }
}
async function eliminarLugar(id, modificadoPor) {
    try {
        let response = null;
        let lugarBd = null;
        if (id) {
            lugarBd = await obtenerLugar(id);
            if (lugarBd) {
                await lugarBd.update({
                    FlagActivo: false
                    , FlagEliminado: true
                    , ModificadoPor: modificadoPor
                    , FechaModificacion: util.get_Date()
                });
                response = buildContainer(true, 'Eliminado correctamente.', null, null);
            }

        }
        if (response === null) {
            throw new Error('No se pudo eliminar lugar');
        }
        return response;
    } catch (error) {
        console.log("controller eliminarLugar(error):", error);
        throw error;
    }
}
async function obtenerLugarPorUbicacion(Latitud, Longitud) {
    try {
        let lugarBdListado = await LugarDTO.findAll({
            where: {
                Latitud: Latitud,
                Longitud: Longitud,
                FlagActivo: true
            }, order: [['FechaCreacion', 'DESC']]
        });
        return lugarBdListado;
    } catch (error) {
        throw error;
    }
}
async function listarLugares(pagina, cantidad) {
    try {
        let response = null;
        let lugarBDList = await LugarDTO.findAll({
            where: { FlagActivo: true, FlagEliminado: false },
            attributes: ['Nombre', 'Latitud', 'Longitud'],
            order: [['FechaCreacion', 'DESC']]
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