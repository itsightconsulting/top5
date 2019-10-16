import models from '../orm.database/models/index';
import util from '../utilitarios/utilitarios';
import { buildContainer, uploadToS3 } from './common.controller';
import { createdOrUpdatedLugar } from "./lugar.controller";
const TopDTO = models.Top;
const TopItemDTO = models.TopItem;
const TopItemDetalleDTO = models.TopItemDetalle;
const Op = models.Sequelize.Op;

async function createOrUpdateTop(objTop) {
    try {
        let response = null;
        let topBD = null;
        if (objTop.id) {
            topBD = await TopDTO.update({
                titulo: objTop.titulo
                , flagPublicado: objTop.flagPublicado
                , CategoriaId: objTop.CategoriaId
                , flagActive: true
                , flagEliminate: false
                , updatedBy: objTop.createdBy
                , updatedAt: util.get_Date()
            }, { where: { id: objTop.id } });
        } else {
            topBD = await TopDTO.create({
                titulo: objTop.titulo
                , CategoriaId: objTop.CategoriaId
                , flagActive: true
                , flagEliminate: false
                , createdBy: objTop.createdBy
                , createdAt: util.get_Date()
                , updatedAt: util.get_Date()
            }, {
                fields: ['titulo', 'CategoriaId', 'flagActive', 'flagEliminate', 'createdBy', 'createdAt', 'updatedAt']
            });
        }
        if (topBD) {
            response = buildContainer(true, '', null, null);
        }

        if (response === null) {
            throw new Error('No se pudo crear top');
        }
        return response;
    } catch (error) {
        throw error;
    }
}
async function listarTopPorUsuario(objParams) {
    try {
        let response = null;
        let topBD = null;
        let { createdBy, pageNumber, pageSize, CategoriaId, flagPublicado } = objParams;

        let whereConditions = { createdBy, flagActive: true };
        if (flagPublicado) {
            whereConditions.flagPublicado = true;
            whereConditions.createdBy = { [Op.notIn]: [createdBy] }
        }
        if (CategoriaId) whereConditions.CategoriaId = CategoriaId;

        let queryObject = {
            where: whereConditions
            , attributes: ['id', 'titulo', 'CategoriaId', 'createdBy', 'updatedAt', 'updatedAtStr', 'flagPublicado', 'fechaPublicado', 'fechaPublicadoStr']
            , include: [{
                model: models.Categoria
                , as: 'Categoria'
                , where: { flagActive: true }
                , attributes: ['name']
            }]
            , order: [['fechaPublicado', 'DESC'], ['updatedAt', 'DESC']]
        };

        if (pageNumber && pageSize) {
            queryObject.offset = ((pageNumber - 1) * pageSize);
            queryObject.limit = pageSize;
        }

        topBD = await TopDTO.findAll(queryObject);
        let totalRows = topBD.length || 0;
        if (totalRows) {
            if (flagPublicado) {
                for (const element of topBD) {
                    let top = element.dataValues;
                    let UsuarioBd = await models.Usuario.findOne({
                        where: { id: top.createdBy, flagActive: true }
                        , attributes: ['id', 'nombreCompleto', 'rutaImagenPerfil']
                    });
                    if (UsuarioBd) {
                        top.Usuarios = UsuarioBd.dataValues;
                    }
                }
            }
            response = buildContainer(true, '', { dataValues: topBD, totalRows }, null);
        } else {
            response = buildContainer(true, '', { dataValues: [], totalRows }, null);
        }
        return response;
    } catch (error) {
        throw error;
    }
}
async function listarTopPublicadoPorUsuario(objParams) {
    try {
        let response = null;
        let topItemBD = null;
        let { createdBy, pageNumber, pageSize, CategoriaId, flagPublicado } = objParams;

        let whereConditions = { createdBy, flagActive: true };
        if (flagPublicado) {
            whereConditions.flagPublicado = true;
            whereConditions.createdBy = { [Op.notIn]: [createdBy] }
        }
        if (CategoriaId) whereConditions.CategoriaId = CategoriaId;

        let queryObject = {
            where: whereConditions
            , attributes: ['id', 'descripcion', 'valoracion', 'LugarId', 'createdBy', 'updatedAt', 'updatedAtStr']
            , include: [{
                model: TopDTO
                , where: { flagActive: true, flagPublicado: true }
                , attributes: []
                , include: [{
                    model: models.Categoria
                    , as: 'Categoria'
                    , where: { flagActive: true }
                    , attributes: []
                }]
            }
            ]
            // , order: [['fechaPublicado', 'DESC'], ['updatedAt', 'DESC']]
        };

        if (pageNumber && pageSize) {
            queryObject.offset = ((pageNumber - 1) * pageSize);
            queryObject.limit = pageSize;
        }

        topItemBD = await TopItemDTO.findAll(queryObject);
        let totalRows = topItemBD.length || 0;
        if (totalRows && flagPublicado) {
            for (const element of topItemBD) {
                let top = element.dataValues;
                let UsuarioBd = await models.Usuario.findOne({
                    where: { id: top.createdBy, flagActive: true }
                    , attributes: ['id', 'nombreCompleto', 'rutaImagenPerfil']
                });
                if (UsuarioBd) {
                    top.Usuarios = UsuarioBd.dataValues;
                }
            }
            response = buildContainer(true, '', { dataValues: topItemBD, totalRows }, null);
        } else {
            response = buildContainer(true, '', { dataValues: [], totalRows }, null);
        }
        return response;
    } catch (error) {
        throw error;
    }
}


async function publicarTop(id, updatedAt, createdBy, flagPublicado) {
    try {
        let response = null;
        updatedAt = util.get_Date();
        if (id) {
            await TopDTO.update({
                flagPublicado: flagPublicado
                , fechaPublicado: updatedAt
                , updatedAt: updatedAt
            }, { where: { id, createdBy } });
            response = buildContainer(true, '', null, null);
        }
        if (response === null) {
            throw new Error('No se pudo publicar top');
        }
        return response;
    } catch (error) {
        throw error;
    }
}
async function getOneTop(id, createdBy) {
    try {
        let response = null;
        let topBD = null;
        topBD = await TopDTO.findOne({
            where: { id, createdBy, flagActive: true }
            , attributes: ['id', 'titulo', 'flagPublicado', 'fechaPublicado', 'updatedAt', 'updatedAtStr']
            , include: [{
                model: models.Categoria
                , as: 'Categoria'
                , where: { flagActive: true }
                , attributes: ['id', 'name', 'updatedAt']
            }]
            , order: [['fechaPublicado', 'DESC'], ['updatedAt', 'DESC']]
        });
        if (topBD) {
            response = buildContainer(true, '', topBD, null);
        } else {
            throw new Error("Top no existe");
        }
        return response;
    } catch (error) {
        throw error;
    }
}
async function eliminarTop(id, updatedAt, createdBy) {
    try {
        let response = null;
        updatedAt = util.get_Date();
        if (id) {
            let topBd = await TopDTO.update({
                flagActive: false
                , flagEliminate: true
                , updatedAt
            }, {
                where: {
                    id, createdBy
                }
            });
            if (topBd) {
                response = buildContainer(true, '', null, null);
            }
        }
        if (response === null) {
            throw new Error('No se pudo eliminar top');
        }
        return response;
    } catch (error) {
        throw error;
    }
}

async function listarTopItemByTop(objParams) {
    try {
        let response = null;
        let topBD = null;
        let { TopId, createdBy, pageNumber, pageSize, flagPublicado } = objParams;

        let whereConditions = { flagActive: true };

        if (createdBy) whereConditions.createdBy = createdBy;
        if (TopId) whereConditions.TopId = TopId;

        let queryObject = {
            where: whereConditions
            , attributes: ['id', 'TopId', 'descripcion', 'valoracion', 'createdBy', 'updatedAt', 'updatedAtStr']
            , include: [{
                model: TopItemDetalleDTO,
                required: false, // do not generate INNER JOIN
                attributes: ['id', 'rutaImagen', 'flagImagenDefaultTop'] // do not return any columns of the other table
            }]
            , include: [{
                model: models.Lugar,
                attributes: ['id', 'name', 'address', 'latitude', 'longitude']
            }]
            , order: [['fechaPublicado', 'DESC'], ['updatedAt', 'DESC']]
        };

        if (pageNumber && pageSize) {
            queryObject.offset = ((pageNumber - 1) * pageSize);
            queryObject.limit = pageSize;
        }

        topBD = await TopItemDTO.findAll(queryObject);
        let totalRows = topBD.length || 0;
        if (totalRows) {
            if (flagPublicado) {
                for (const element of topBD) {
                    let top = element.dataValues;
                    let UsuarioBd = await models.Usuario.findOne({
                        where: { id: top.createdBy, flagActive: true }
                        , attributes: ['id', 'nombreCompleto', 'rutaImagenPerfil']
                    });
                    if (UsuarioBd) {
                        top.Usuarios = UsuarioBd.dataValues;
                    }
                }
            }
            response = buildContainer(true, '', { dataValues: topBD, totalRows }, null);
        } else {
            response = buildContainer(true, '', { dataValues: [], totalRows }, null);
        }
        return response;
    } catch (error) {
        throw error;
    }
}


async function createdOrUpdatedTopItem(objTopItem) {
    try {
        let queryObject = {
            descripcion: objTopItem.descripcion
            , valoracion: objTopItem.valoracion
            , LugarId: objTopItem.LugarId
            , TopId: objTopItem.TopId
            , flagActive: true
            , flagEliminate: false
            , updatedAt: objTopItem.updatedAt
        };

        if (objTopItem.id) {
            queryObject.updatedBy = objTopItem.createdBy;
            var { dataValues } = await TopItemDTO.update(queryObject, { where: { id: objTopItem.id } });

        } else {
            queryObject.createdBy = objTopItem.createdBy;
            queryObject.createdAt = objTopItem.createdAt;

            var { dataValues } = await TopItemDTO.create(queryObject, {
                fields: ['descripcion', 'valoracion', 'LugarId', 'TopId', 'flagActive', 'flagEliminate', 'createdBy', 'createdAt', 'updatedAt']
            });
        }
        return buildContainer(true, '', dataValues, null);
    } catch (error) {
        throw error;
    }
}
async function createOrUpdateTopItem({ objLugar, objTopItem, objListTopItemDetalle, files }) {
    try {
        let response = null;
        // await models.sequelize.transaction(async transact => {
        if (objLugar) {
            let responseLugar = await createdOrUpdatedLugar(objLugar);
            objTopItem.LugarId = responseLugar.data.id;
        }
        let responseTopItem = await createdOrUpdatedTopItem(objTopItem);
        // registrar Detalle
        response = buildContainer(true, '', responseTopItem.data, null);
        // });
        return response;
    } catch (error) {
        throw error;
    }
}
async function listarTopByLugar(LugarId, createdBy, flagPublicado) {
    try {
        let topBD = null;
        let conditionsObject = { flagActive: true };
        if (flagPublicado) conditionsObject.flagPublicado = flagPublicado;
        if (createdBy) conditionsObject.createdBy = createdBy;

        topBD = await TopDTO.findAll({
            where: conditionsObject
            , attributes: ['id', 'titulo', 'CategoriaId', 'createdBy', 'updatedAt', 'updatedAtStr', 'fechaPublicado', 'fechaPublicadoStr']
            , include: [{
                model: models.TopItem
                , where: { LugarId }
                , attributes: []
            }]
            , order: [['updatedAt', 'DESC']]
        });
        let response = buildContainer(true, '', topBD, null);
        return response;
    } catch (error) {
        throw error;
    }
}
// async function createOrUpdateTopItem2(objLugar, objTopItem, objListTopItemDetalle, files) {
//     try {
//         let response = null;
//         let topItemBD = null;
//         await models.sequelize.transaction(async transact => {

//             let LugarId = objTopItem.LugarId || null;
//             let responseLugar = await crearLugar(objLugar, transact);

//             if (LugarId === null) {
//                 LugarId = responseLugar.data.id;
//             }

//             if (LugarId) {
//                 objTopItem.updatedAt = util.get_Date();
//                 if (objTopItem.id) {
//                     topItemBD = await TopItemDTO.update({
//                         descripcion: objTopItem.descripcion
//                         , valoracion: objTopItem.valoracion
//                         , LugarId
//                         , TopId: objTopItem.TopId
//                         , flagActive: true
//                         , flagEliminate: false
//                         , updatedBy: objTopItem.createdBy
//                         , updatedAt: objTopItem.updatedAt
//                     }, { where: { id: objTopItem.id } }, { transaction: transact });
//                 } else {
//                     topItemBD = await TopItemDTO.create({
//                         descripcion: objTopItem.descripcion
//                         , valoracion: objTopItem.valoracion
//                         , LugarId
//                         , TopId: objTopItem.TopId
//                         , flagActive: true
//                         , flagEliminate: false
//                         , createdBy: objTopItem.createdBy
//                         , createdAt: objTopItem.updatedAt
//                         , updatedAt: objTopItem.updatedAt
//                     }, {
//                         fields: ['descripcion', 'valoracion', 'LugarId', 'TopId', 'flagActive', 'flagEliminate', 'createdBy', 'createdAt', 'updatedAt']
//                     }, { transaction: transact });
//                 }
//                 let TopItemId = topItemBD.id;
//                 if (TopItemId) {
//                     // await createOrUpdateTopItemDetalle(TopItemId, objTopItem.createdBy, objTopItem.updatedAt, objListTopItemDetalle, files, idsEliminar, transact);
//                     response = buildContainer(true, '', topItemBD, null);
//                 }
//             }

//         });

//         if (response === null) {
//             throw new Error('No se pudo crear top item');
//         }
//         return response;
//     } catch (error) {
//         throw error;
//     }
// }
async function createOrUpdateTopItemDetalle(TopId, createdBy, updatedAt, objListTopItemDetalle, files, idsEliminar, transact) {
    try {
        let response = null;
        if (objListTopItemDetalle) {
            let responseEliminarTopItemDetalle = await eliminarTopItemDetalle(updatedAt, idsEliminar, transact);
            if (responseEliminarTopItemDetalle.ok) {
                for (const element of objListTopItemDetalle) {
                    let topItemDetalleBD = null;
                    // const { name, size, mimetype } = file;
                    // let key = `user/${id}/${path}/${name}`;
                    // const { Location } = await uploadToS3(file, bucketName, key);

                    let rutaImagen = element.rutaImagen;

                    let id = objListTopItemDetalle.id || 0;
                    if (id) {
                        let queryObject = {
                            rutaImagen: rutaImagen
                            , flagImagenDefaultTop: element.flagImagenDefaultTop
                            , flagActive: true
                            , flagEliminate: false
                            , updatedBy: createdBy
                            , updatedAt: updatedAt
                        };
                        queryObject.where = { id, TopId };
                        if (transact) {
                            queryObject.transaction = transact;
                        }
                        topItemDetalleBD = await TopItemDetalleDTO.update(queryObject);
                    } else {
                        let queryObject = {
                            rutaImagen: rutaImagen
                            , flagImagenDefaultTop: element.flagImagenDefaultTop
                            , TopId: TopId
                            , flagActive: true
                            , flagEliminate: false
                            , createdBy: element.createdBy
                            , createdAt: updatedAt
                            , updatedAt: updatedAt
                        };
                        queryObject.fields = ['rutaImagen', 'flagImagenDefaultTop', 'flagActive', 'flagEliminate', 'createdBy', 'createdAt', 'updatedAt'];
                        if (transact) {
                            queryObject.transaction = transact;
                        }

                        topItemDetalleBD = await TopItemDetalleDTO.create(queryObject);
                    }
                    if (topItemDetalleBD) {
                        response = buildContainer(true, '', null, null);
                    }
                }
            }
        }
        if (response === null) {
            throw new Error('No se pudo crear top item');
        }
        return response;
    } catch (error) {
        throw error;
    }
}
async function eliminarTopItemDetalle(updatedAt, idsEliminar, transact) {
    try {
        let response = null;

        let queryObject = {
            flagActive: false
            , flagEliminate: true
            , flagImagenDefaultTop: false
            , updatedAt: updatedAt
        };
        queryObject.where = { id: { [Op.in]: [idsEliminar] } };
        if (transact) {
            queryObject.transact = transact;
        }
        let topItemDetalleBd = await TopItemDetalleDTO.update(queryObject);

        if (topItemDetalleBd) {
            response = buildContainer(true, '', null, null);
        }
        if (response === null) {
            throw new Error('No se pudo eliminar top item detalle');
        }
        return response;
    } catch (error) {
        throw error;
    }
}
async function eliminarTopItem(id, updatedAt, createdBy) {
    try {
        let response = null;
        let TopBd = null;
        updatedAt = util.get_Date();
        if (id) {
            await TopBd.update({
                flagActive: false
                , flagEliminate: true
                , updatedAt
            }, {
                where: {
                    id, createdBy
                }
            });
            let eliminarDetalle = await eliminarTopDetallePorTopId(id);
            if (eliminarDetalle.ok) {
                response = buildContainer(true, 'Eliminado correctamente.', null, null);
            }

        }
        if (response === null) {
            throw new Error('No se pudo eliminar top');
        }
        return response;
    } catch (error) {
        throw error;
    }
}


async function obtenerTop(id) {
    try {
        let topBD = await TopDTO.findOne({
            where: {
                id
            }
        });
        return topBD;
    } catch (error) {
        throw error;
    }
}
async function listarTopItemPorUsuario(createdBy, cantidad) {
    try {
        let topBD = null;
        let response = null;
        // if (cantidad) {

        // } else {
        topBD = await TopDTO.findAll({
            where: { createdBy, flagActive: true }
            , include: [{
                model: TopItemDTO
                , where: { flagActive: true }
                , include: [{
                    model: TopItemDetalleDTO
                    , where: { flagImagenDefaultTop: true }
                }]
            }]
            , order: [['updatedAt', 'DESC']]
        });
        // }
        response = buildContainer(true, '', topBD, null);
        return response;
    } catch (error) {
        throw error;
    }
}

async function obtenerTopItemDetalle(id) {
    try {
        let topItemDetalleBD = await TopItemDetalleDTO.findOne({
            where: {
                id
            }
        });
        return topItemDetalleBD;
    } catch (error) {
        throw error;
    }
}
async function listarTopGeneral(categoriaId, cantidad) {
    try {
        let response = null;
        let topBD = null;
        if (cantidad) {
            topBD = await TopDTO.findAll({
                where: {
                    categoriaId,
                    flagActive: true
                }
                , include: [{
                    model: TopItemDTO
                    , where: { flagActive: true }
                    , include: [{
                        model: TopItemDetalleDTO
                        , where: { flagImagenDefaultTop: true }
                    }]
                }]
            });
        } else {
            topBD = await TopDTO.findAll({
                where: {
                    categoriaId,
                    flagActive: true
                }
                , include: [{
                    model: TopItemDTO
                    , where: { flagActive: true }
                    , include: [{
                        model: TopItemDetalleDTO
                        , where: { flagImagenDefaultTop: true }
                    }]
                }]
                , order: [['updatedAt', 'DESC']]
            });
        }
        response = buildContainer(true, '', topBD, null);
        return response;
    } catch (error) {
        throw error;
    }
}
async function listarTopByLugarByCategoria(LugarId, categoriaId) {
    try {
        let response = null;
        let topBD = null;
        topBD = await TopDTO.findAll({
            where: {
                LugarId,
                categoriaId,
                flagActive: true
            }
            , attributes: ['id', 'LugarId', 'categoriaId', 'titulo', 'updatedAt']
            , include: [{
                model: TopItemDTO
                , where: { flagActive: true }
                , include: [{
                    model: TopItemDetalleDTO
                    , where: { flagImagenDefaultTop: true }
                    , attributes: ['id', 'TopItemId', 'rutaImagen']
                }]
                , attributes: ['id', 'descripcion', 'flagPublicado', 'valoracion']
            }]
            , order: [['updatedAt', 'DESC']]
        });
        response = buildContainer(true, '', topBD, null);
        return response;
    } catch (error) {
        throw error;
    }
}
async function listarTopPorUsuarioPorCategoria(categoriaId, createdBy) {
    try {
        let response = null;
        let topBDListado = await TopDTO.findAll({
            where: {
                createdBy,
                categoriaId,
                flagActive: true
            }, order: [['updatedAt', 'DESC']]
        });
        // TODO obtener foto default
        response = buildContainer(true, '', topBDListado, null);
        return response;
    } catch (error) {
        throw error;
    }
}
async function listarTopPorUsuarioPorFiltro(filtro, createdBy) {
    try {
        let response = null;
        let topItemBDListado = await TopItemDTO.findAll({
            where: {
                flagActive: true,
                [Op.or]: [{ Titulo: { [Op.like]: filtro } }]
            }
            , include: [{
                model: TopItemDTO,
                where: {
                    flagActive: true,
                    createdBy,
                    [Op.or]: [{ Descripcion: { [Op.like]: filtro } }]
                }
            }]
            , order: [['updatedAt', 'DESC']]
        });
        // TODO obtener foto default
        response = buildContainer(true, '', topItemBDListado, null);
        return response;
    } catch (error) {
        throw error;
    }
}
async function listarTopDetallePorTopItem(id) {
    try {
        let response = null;
        let topItemDetalleBD = await TopItemDetalleDTO.findAll({
            where: {
                TopItemId: id,
                flagActive: true
            }, order: [['updatedAt', 'DESC']]
        });
        response = buildContainer(true, '', topItemDetalleBD, null);
        return response;
    } catch (error) {
        throw error;
    }
}
async function crearTopItem(objTop, objTopDetalle) {
    try {
        let response = null;
        let topBD = null;
        if (objTop.id) {
            topBD = await obtenerTop(objTop.id);
            if (topBD) {
                await topBD.update({
                    titulo: objTop.titulo
                    , descripcion: objTop.descripcion
                    , categoriaId: objTop.CategoriaId
                    , valoracion: objTop.valoracion
                    , flagPublicado: objTop.flagPublicado
                    , LugarId: objTop.LugarId
                    , flagActive: true
                    , FlagEliminate: false
                    , updatedBy: objTop.createdBy
                    , updatedAt: util.get_Date()
                });
            }

        } else {
            topBD = await TopDTO.create({
                titulo: objTop.titulo
                , descripcion: objTop.descripcion
                , categoriaId: objTop.categoriaId
                , valoracion: objTop.valoracion
                , flagPublicado: objTop.flagPublicado
                , LugarId: objTop.LugarId
                , flagActive: true
                , FlagEliminate: false
                , createdBy: objTop.createdBy
                , createdAt: util.get_Date()
                , updatedAt: util.get_Date()
            }, {
                fields: ['titulo', 'descripcion', 'categoriaId', 'valoracion', 'flagPublicado', 'LugarId', 'flagActive', 'FlagEliminate', 'createdBy', 'createdAt', 'updatedAt']
            });

        }

        if (topBD) {
            objTopDetalle.forEach(async element => {
                element.TopId = topBD.id;
                let topItemDetalleBD = await crearTopDetalle(element);
                if (!topItemDetalleBD.ok) {
                    throw new Error('No se pudo crear top detalle');
                }
            });
            response = buildContainer(true, 'Top creado correctamente.', null, null);
        }

        if (response === null) {
            throw new Error('No se pudo crear top');
        }
        return response;
    } catch (error) {
        throw error;
    }
}
async function crearTopDetalle(topDetalle) {
    try {
        let response = null;
        let topItemDetalleBD = null;
        if (topDetalle.id) {
            topItemDetalleBD = await obtenerTopItemDetalle(topDetalle.id);
            if (topItemDetalleBD) {
                await topItemDetalleBD.update({
                    rutaImagen: topDetalle.rutaImagen
                    , flagImagenDefaultTop: topDetalle.flagImagenDefaultTop
                    , flagActive: true
                    , flagEliminate: false
                    , updatedBy: topDetalle.createdBy
                    , updatedAt: util.get_Date()
                });
            }
        } else {
            topItemDetalleBD = await TopItemDetalleDTO.create({
                TopId: topDetalle.TopId
                , rutaImagen: topDetalle.rutaImagen
                , flagImagenDefaultTop: topDetalle.flagImagenDefaultTop
                , flagActive: true
                , flagEliminate: false
                , createdBy: topDetalle.createdBy
                , createdAt: util.get_Date()
                , updatedAt: util.get_Date()
            }, {
                fields: ['TopId', 'rutaImagen', 'flagImagenDefaultTop', 'flagActive', 'flagEliminate', 'createdAt', 'updatedAt']
            });
        }

        if (topItemDetalleBD) {
            response = buildContainer(true, 'Creado correctamente.', topItemDetalleBD, null);
        }
        if (response === null) {
            throw new Error('No se pudo crear top detalle');
        }
        return response;
    } catch (error) {
        throw error;
    }
}
async function eliminarTopDetalle(id) {
    try {
        let response = null;
        let topItemDetalleBD = null;
        if (id) {
            topItemDetalleBD = await obtenerTopItemDetalle(id);
            if (topItemDetalleBD) {
                await topItemDetalleBD.update({
                    flagActive: false
                    , FlagEliminate: true
                    , updatedAt: util.get_Date()
                });
            }
            response = buildContainer(true, 'Eliminado correctamente.', null, null);
        }
        if (response === null) {
            throw new Error('No se pudo eliminar top detalle');
        }
        return response;
    } catch (error) {
        throw error;
    }
}
async function eliminarTopDetallePorTopId(id) {
    try {
        let response = null;
        if (id) {
            await TopItemDetalleDTO.update({
                flagActive: false
                , flagEliminate: true
                , updatedAt: util.get_Date()
            }, {
                where: {
                    TopId: id
                }
            });
            response = buildContainer(true, 'Eliminado correctamente.', null, null);
        }
        if (response === null) {
            throw new Error('No se pudo eliminar top detalle');
        }
        return response;
    } catch (error) {
        throw error;
    }
}
module.exports = {
    createOrUpdateTop,
    listarTopPorUsuario,
    listarTopDetallePorTopItem,
    eliminarTopDetalle,
    eliminarTop,

    listarTopByLugar,

    listarTopItemByTop,
    createOrUpdateTopItem,
    createOrUpdateTopItemDetalle,
    eliminarTopItem,

    listarTopPorUsuarioPorCategoria,
    listarTopPorUsuarioPorFiltro,
    listarTopGeneral,
    publicarTop,
    getOneTop,
    listarTopByLugarByCategoria,
    crearTopItem,

    listarTopPublicadoPorUsuario
}