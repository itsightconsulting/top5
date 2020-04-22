import models from '../orm.database/models/index';
import util from '../utilitarios/utilitarios';
import { buildContainer } from './common.controller';
const LugarDTO = models.Lugar;
const Op = models.Sequelize.Op;

async function createdOrUpdatedLugar(objLugar) {
    try {
        let queryObject = {
            name: objLugar.name
            , latitude: objLugar.latitude
            , longitude: objLugar.longitude
            , address: objLugar.address
            , flagActive: true
            , flagEliminate: false
<<<<<<< HEAD
            , updatedDate: objLugar.updatedDate
=======
            , updatedAt: objLugar.updatedAt
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
        };

        if (objLugar.id) {
            queryObject.updatedBy = objLugar.createdBy;
<<<<<<< HEAD
            await LugarDTO.update(queryObject, { where: { id: objLugar.id } });
            var dataValues = objLugar;
        } else {
            queryObject.createdBy = objLugar.createdBy;
            queryObject.createdDate = objLugar.createdDate;

            var { dataValues } = await LugarDTO.create(queryObject, {
                fields: ['name', 'latitude', 'longitude', 'address', 'flagActive', 'flagEliminate', 'createdBy', 'createdDate', 'updatedDate']
=======
            var { dataValues } = await LugarDTO.update(queryObject, { where: { id: objLugar.id } });
        } else {
            queryObject.createdBy = objLugar.createdBy;
            queryObject.createdAt = objLugar.createdAt;

            var { dataValues } = await LugarDTO.create(queryObject, {
                fields: ['name', 'latitude', 'longitude', 'address', 'flagActive', 'flagEliminate', 'createdBy', 'createdAt', 'updatedAt']
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
            });
        }
        return buildContainer(true, '', dataValues, null);
    } catch (error) {
        throw error;
    }
}


async function obtenerLugar(id, createdBy) {
    try {
        let conditionObject = { id };
        if (createdBy) conditionObject.createdBy = createdBy;
        let { dataValues } = await LugarDTO.findOne({
            where: conditionObject
<<<<<<< HEAD
            , attributes: ['id', 'name', 'latitude', 'longitude', 'address', 'updatedDate', 'updatedDateStr']
=======
            , attributes: ['id', 'name', 'latitude', 'longitude', 'address', 'updatedAt', 'updatedAtStr']
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
        });
        let response = buildContainer(true, '', dataValues, null);
        return response;
    } catch (error) {
        throw error;
    }
}
async function listarLugares(createdBy) {
    try {
        let response = null;
        let conditionObject = { flagActive: true, flagEliminate: false, TopId: { [Op.ne]: null } };
        if (createdBy) conditionObject.createdBy = createdBy;

        let lugarBDList = await LugarDTO.findAll({
            where: { flagActive: true }
<<<<<<< HEAD
            , attributes: ['id', 'name', 'latitude', 'longitude', 'address', 'updatedDate', 'updatedDateStr'
=======
            , attributes: ['id', 'name', 'latitude', 'longitude', 'address', 'updatedAt', 'updatedAtStr'
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
                , [models.Sequelize.fn("COUNT", models.Sequelize.col("TopItems.id")), "CountTop"]]
            , include: [{
                model: models.TopItem
                , where: conditionObject
                , attributes: []
                , include: [{
                    model: models.Top
                    , where: { flagActive: true, flagPublicado: true }
                    , attributes: []
                    , required: true
                }]
            }]
<<<<<<< HEAD
            , group: ['Lugar.id', 'Lugar.name', 'Lugar.latitude', 'Lugar.longitude', 'Lugar.address', 'Lugar.updatedDate']
            , order: [['updatedDate', 'DESC']]
=======
            , group: ['Lugar.id', 'Lugar.name', 'Lugar.latitude', 'Lugar.longitude', 'Lugar.address', 'Lugar.updatedAt']
            , order: [['updatedAt', 'DESC']]
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
        });
        let data = { total: lugarBDList.length, datos: lugarBDList };
        response = buildContainer(true, null, data, null);
        return response;
    } catch (error) {
        throw error;
    }
}
<<<<<<< HEAD
async function eliminarLugar(id, updatedDate) {
=======
async function eliminarLugar(id, updatedAt) {
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
    try {
        let response = null;
        let lugarBd = null;
        if (id) {
            // lugarBd = await obtenerLugar(id);
            // if (lugarBd) {
            await lugarBd.update({
                flagActive: false
                , flagEliminate: true
<<<<<<< HEAD
                , updatedDate
=======
                , updatedAt
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
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
<<<<<<< HEAD
            }, order: [['updatedDate', 'DESC']]
=======
            }, order: [['updatedAt', 'DESC']]
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
        });
        let data = { total: lugarBdListado.length, datos: lugarBdListado };
        response = buildContainer(true, null, data, null);
        return response;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createdOrUpdatedLugar,

    obtenerLugar,
    listarLugares,
    eliminarLugar,
    obtenerLugarPorUbicacion
}