import models from '../orm.database/models/index';
import util from '../utilitarios/utilitarios';
import { buildContainer } from './common.controller';
const LugarDTO = models.Lugar;

async function obtenerLugar(id, createdBy) {
    try {
        let conditionObject = { id };
        if (createdBy) conditionObject.createdBy = createdBy;
        let { dataValues } = await LugarDTO.findOne({
            where: conditionObject
            , attributes: ['id', 'name', 'latitude', 'longitude', 'address', 'updatedAt', 'updatedAtStr']
        });
        let response = buildContainer(true, '', dataValues, null);
        return response;
    } catch (error) {
        throw error;
    }
}
async function createdOrUpdatedLugar(objLugar) {
    try {
        let queryObject = {
            name: objLugar.name
            , latitude: objLugar.latitude
            , longitude: objLugar.longitude
            , address: objLugar.address
            , flagActive: true
            , flagEliminate: false
            , updatedAt: objLugar.updatedAt
        };

        if (objLugar.id) {
            queryObject.updatedBy = objLugar.createdBy;
            var { dataValues } = await LugarDTO.update(queryObject, { where: { id: objLugar.id } });
        } else {
            queryObject.createdBy = objLugar.createdBy;
            queryObject.createdAt = objLugar.createdAt;

            var { dataValues } = await LugarDTO.create(queryObject, {
                fields: ['name', 'latitude', 'longitude', 'address', 'flagActive', 'flagEliminate', 'createdBy', 'createdAt', 'updatedAt']
            });
        }
        return buildContainer(true, '', dataValues, null);
    } catch (error) {
        throw error;
    }
}
async function listarLugares(createdBy) {
    try {
        let response = null;
        let conditionObject = { flagActive: true, flagEliminate: false };
        if (createdBy) conditionObject.createdBy = createdBy;

        let lugarBDList = await LugarDTO.findAll({
            where: { flagActive: true }
            , attributes: ['id', 'name', 'latitude', 'longitude', 'address', 'updatedAt', 'updatedAtStr'
                , [models.Sequelize.fn("COUNT", models.Sequelize.col("TopItems.id")), "CountTop"]]
            , include: [{
                model: models.TopItem
                , where: conditionObject
                , attributes: []
            }]
            , group: ['Lugar.id', 'Lugar.name', 'Lugar.latitude', 'Lugar.longitude', 'Lugar.address', 'Lugar.updatedAt']
            , order: [['updatedAt', 'DESC']]
        });
        let data = { total: lugarBDList.length, datos: lugarBDList };
        response = buildContainer(true, null, data, null);
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

// async function crearLugar(data, transact) {
//     try {
//         let response = null;
//         let lugarBD = null;
//         const { name, latitude, longitude, address, createdBy } = data;
//         if (data.id) {
//             let queryObject = {
//                 name
//                 , latitude
//                 , longitude
//                 , address
//                 , flagActive: true
//                 , flagEliminate: false
//                 , updatedBy: createdBy
//                 , updatedAt: util.get_Date()
//             };
//             queryObject.where = { id: data.id };
//             if (transact) {
//                 queryObject.transaction = transact;
//             }

//             lugarBD = await LugarDTO.update(queryObject);
//         } else {
//             let queryObject = {
//                 name
//                 , latitude
//                 , longitude
//                 , address
//                 , flagActive: true
//                 , flagEliminate: false
//                 , createdBy
//                 , createdAt: util.get_Date()
//                 , updatedAt: util.get_Date()
//             };
//             queryObject.fields = ['name', 'latitude', 'longitude', 'address', 'flagActive', 'flagEliminate', 'createdBy', 'createdAt', 'updatedAt'];
//             if (transact) {
//                 queryObject.transaction = transact;
//             }
//             lugarBD = await LugarDTO.create(queryObject);
//         }

//         if (lugarBD) {
//             console.log("lugar.controller return");
//             response = buildContainer(true, null, lugarBD, null);
//         }

//         if (response === null) {
//             throw new Error('No se pudo crear lugar');
//         }
//         return response;
//     } catch (error) {
//         throw error;
//     }
// }
module.exports = {
    createdOrUpdatedLugar,
    obtenerLugar,
    eliminarLugar,
    obtenerLugarPorUbicacion,
    listarLugares,

}