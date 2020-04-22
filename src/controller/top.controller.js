import models from '../orm.database/models/index';
import util from '../utilitarios/utilitarios';
import { buildContainer, uploadToS3 } from './common.controller';
import { createdOrUpdatedLugar } from "./lugar.controller";
const TopDTO = models.Top;
const TopItemDTO = models.TopItem;
const TopItemDetalleDTO = models.TopItemDetalle;
const TopItemLikeDTO = models.TopItemLike;
const Op = models.Sequelize.Op;
/* TOP */
async function createOrUpdateTop(objTop) {
    try {
        let response = null;
        let topBD = null;
<<<<<<< HEAD
        // console.log(objTop.updatedDate);
=======
        console.log(objTop.updatedAt);
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
        if (objTop.id) {
            topBD = await TopDTO.update({
                titulo: objTop.titulo
                , flagPublicado: objTop.flagPublicado
                , CategoriaId: objTop.CategoriaId
                , flagActive: true
                , flagEliminate: false
                , updatedBy: objTop.createdBy
<<<<<<< HEAD
                , updatedDate: objTop.updatedDate
=======
                , updatedAt: objTop.updatedAt
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
            }, { where: { id: objTop.id } });
        } else {
            topBD = await TopDTO.create({
                titulo: objTop.titulo
                , CategoriaId: objTop.CategoriaId
                , flagActive: true
                , flagEliminate: false
                , createdBy: objTop.createdBy
<<<<<<< HEAD
                , createdDate: objTop.createdDate
                , updatedDate: objTop.updatedDate
            }, {
                fields: ['titulo', 'CategoriaId', 'flagActive', 'flagEliminate', 'createdBy', 'createdDate', 'updatedDate']
=======
                , createdAt: objTop.createdAt
                , updatedAt: objTop.updatedAt
            }, {
                fields: ['titulo', 'CategoriaId', 'flagActive', 'flagEliminate', 'createdBy', 'createdAt', 'updatedAt']
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
            });
        }
        if (topBD) {
            response = buildContainer(true, '', topBD, null);
        }

        if (response === null) {
            throw new Error('No se pudo crear top');
        }
        return response;
    } catch (error) {
        throw error;
    }
}
<<<<<<< HEAD
=======
async function updateOrderItems(objTop) {
    try {
        let response = null;
        let topBD = null;
        if (objTop.id) {
            topBD = await TopDTO.update({
                orderItems: objTop.orderItems
                , updatedBy: objTop.createdBy
                , updatedAt: objTop.updatedAt
            }, { where: { id: objTop.id } });
        }
        if (topBD) {
            response = buildContainer(true, '', topBD, null);
        }
        if (response === null) {
            throw new Error('No se pudo actualizar el orden de items del top');
        }
        return response;
    } catch (error) {
        throw error;
    }
}
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
async function listarTopPorUsuario(objParams) {
    try {
        let response = null;
        let topBD = null;
        let { createdBy, pageNumber, pageSize, CategoriaId, flagPublicado } = objParams;

        let whereConditions = { createdBy, flagActive: true };
        if (flagPublicado) {
            whereConditions.flagPublicado = true;
            // whereConditions.createdBy = { [Op.notIn]: [createdBy] }
        }
        if (CategoriaId) whereConditions.CategoriaId = CategoriaId;

        let queryObject = {
            where: whereConditions
<<<<<<< HEAD
            , attributes: ['id', 'titulo', 'CategoriaId', 'createdBy', 'updatedDate', 'updatedDateStr', 'flagPublicado', 'fechaPublicado', 'fechaPublicadoStr']
=======
            , attributes: ['id', 'titulo', 'CategoriaId', 'createdBy', 'updatedAt', 'updatedAtStr', 'flagPublicado', 'fechaPublicado', 'fechaPublicadoStr']
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
            , include: [{
                model: models.Categoria
                , as: 'Categoria'
                , where: { flagActive: true }
<<<<<<< HEAD
                , attributes: ['name', 'nroOrden']
            }]
            , order: [
                ['fechaPublicado', 'DESC'],
                ['updatedDate', 'DESC'],
=======
                , attributes: ['name']
            }]
            , order: [
                ['fechaPublicado', 'DESC'],
                ['updatedAt', 'DESC'],
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
            ]

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
<<<<<<< HEAD
async function publicarTop(id, updatedDate, createdBy, flagPublicado) {
=======
async function publicarTop(id, updatedAt, createdBy, flagPublicado) {
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
    try {
        let response = null;
        if (id) {
            await TopDTO.update({
                flagPublicado: flagPublicado
<<<<<<< HEAD
                , fechaPublicado: updatedDate
                , updatedDate: updatedDate
=======
                , fechaPublicado: updatedAt
                , updatedAt: updatedAt
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
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
<<<<<<< HEAD
async function eliminarTop(id, updatedDate, createdBy) {
=======
async function eliminarTop(id, updatedAt, createdBy) {
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
    try {
        let response = null;
        if (id) {
            let topBd = await TopDTO.update({
                flagActive: false
                , flagEliminate: true
<<<<<<< HEAD
                , updatedDate
=======
                , updatedAt
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
                , updatedBy: createdBy
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
/* TOP ITEM  */
async function createOrUpdateTopItem({ top, lugar, topItem }) {
    try {
        let response = null;
        // await models.sequelize.transaction(async transact => {
        if (!topItem.TopId) {
            let responseTop = await createOrUpdateTop(top);
            topItem.TopId = responseTop.data.id;
        }

        if (!topItem.LugarId) {
            let responseLugar = await createdOrUpdatedLugar(lugar);
            topItem.LugarId = responseLugar.data.id;
        }

        let responseTopItem = await createdOrUpdatedTopItem(topItem);
        // registrar Detalle
        response = buildContainer(true, '', responseTopItem.data, null);
        // });
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

        let whereConditions = { flagActive: true };
        if (createdBy) {
            whereConditions.createdBy = createdBy;
        }
        let whereConditionsTop = { flagActive: true, flagPublicado: true };
        let whereConditionsCategoria = { flagActive: true };

        if (flagPublicado) {
            whereConditionsTop.flagPublicado = true;
            // whereConditionsTop.createdBy = { [Op.notIn]: [createdBy] }
        }
        if (CategoriaId) whereConditionsTop.CategoriaId = CategoriaId;

        let queryObject = {
            where: whereConditions
<<<<<<< HEAD
            , attributes: ['id', 'descripcion', 'valoracion', 'LugarId', 'createdBy', 'updatedDate', 'updatedDateStr']
            , include: [{
                model: TopDTO
                , where: whereConditionsTop
                , attributes: ['id', 'titulo', 'fechaPublicado', 'fechaPublicadoStr', 'updatedDate']
=======
            , attributes: ['id', 'descripcion', 'valoracion', 'LugarId', 'createdBy', 'updatedAt', 'updatedAtStr']
            , include: [{
                model: TopDTO
                , where: whereConditionsTop
                , attributes: ['id', 'titulo', 'fechaPublicado', 'fechaPublicadoStr', 'updatedAt']
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
                , include: [{
                    required: true
                    , model: models.Categoria
                    , as: 'Categoria'
                    , where: whereConditionsCategoria
                    , attributes: []
                }]
            }, {
                model: TopItemDetalleDTO,
                required: false,
                attributes: ['id', 'rutaImagen', 'flagImagenDefaultTop'],
                where: { flagActive: true }
            }, {
                model: models.Lugar,
                attributes: ['id', 'name', 'address', 'latitude', 'longitude']
            }, {
                required: false,
                where: { flagActive: true },
                model: TopItemLikeDTO,
                attributes: ['id', 'UsuarioId']
            }]
<<<<<<< HEAD
            , order: [['updatedDate', 'DESC']]
=======
            , order: [['updatedAt', 'DESC']]
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
        };

        // if (pageNumber && pageSize) {
        queryObject.offset = ((pageNumber - 1) * pageSize);
        queryObject.limit = pageSize;
        // }
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
<<<<<<< HEAD
            , attributes: ['id', 'TopId', 'descripcion', 'valoracion', 'createdBy', 'updatedDate', 'updatedDateStr', 'LugarId']
=======
            , attributes: ['id', 'TopId', 'descripcion', 'valoracion', 'createdBy', 'updatedAt', 'updatedAtStr', 'LugarId']
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
            , include: [{
                model: TopItemDetalleDTO,
                required: false,
                attributes: ['id', 'rutaImagen', 'flagImagenDefaultTop'],
                where: { flagActive: true }
            }, {
                model: models.Lugar,
                attributes: ['id', 'name', 'address', 'latitude', 'longitude']
<<<<<<< HEAD
            }, {
                required: false,
                where: { flagActive: true },
                model: TopItemLikeDTO,
                attributes: ['id', 'UsuarioId']
            }]
            , order: [['updatedDate', 'DESC']]
=======
            }]
            , order: [['updatedAt', 'DESC']]
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
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
async function listarTopItemByLugar(lugarId, { pageNumber, pageSize }) {
    try {
<<<<<<< HEAD
        console.log("listarTopItemByLugar");
=======
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
        let response = null;
        let topItemBD = null;
        let queryObject = {
            where: { flagActive: true, LugarId: lugarId, TopId: { [Op.ne]: null } }
<<<<<<< HEAD
            , attributes: ['id', 'TopId', 'descripcion', 'valoracion', 'createdBy', 'updatedDate', 'updatedDateStr', 'flagActive']
=======
            , attributes: ['id', 'TopId', 'descripcion', 'valoracion', 'createdBy', 'updatedAt', 'updatedAtStr']
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
            , include: [{
                model: TopDTO,
                attributes: [],
                where: { flagActive: true, flagPublicado: true },
                required: true,
                as: 'Top'
<<<<<<< HEAD
            }, {
                model: TopItemDetalleDTO,
                required: false,
                attributes: ['id', 'rutaImagen', 'flagImagenDefaultTop', 'flagActive'],
                where: { flagActive: true }
            }]
            , order: [['updatedDate', 'DESC']]
=======
            }]
            , include: [{
                model: TopItemDetalleDTO,
                required: false,
                attributes: ['id', 'rutaImagen', 'flagImagenDefaultTop'],
                where: { flagActive: true }
            }]
            , order: [['updatedAt', 'DESC']]
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
        };

        if (pageNumber && pageSize) {
            queryObject.offset = ((pageNumber - 1) * pageSize);
            queryObject.limit = pageSize;
        }

        topItemBD = await TopItemDTO.findAll(queryObject);
        let totalRows = topItemBD.length || 0;
        if (totalRows > 0) {
            for (const element of topItemBD) {
                let topItem = element.dataValues;
                let UsuarioBd = await models.Usuario.findOne({
                    where: { id: topItem.createdBy, flagActive: true }
                    , attributes: ['id', 'nombreCompleto', 'rutaImagenPerfil']
                });
                if (UsuarioBd) {
                    topItem.Usuarios = UsuarioBd.dataValues;
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

<<<<<<< HEAD
async function eliminarTopItem(id, updatedDate, createdBy) {
=======
async function eliminarTopItem(id, updatedAt, createdBy) {
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
    try {
        let response = null;
        if (id) {
            let topBd = await TopItemDTO.update({
                flagActive: false
                , flagEliminate: true
<<<<<<< HEAD
                , updatedDate: updatedDate
=======
                , updatedAt: updatedAt
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
                , updatedBy: createdBy
            }, {
                where: {
                    id, createdBy
                }
            });
            if (topBd) {
                let eliminarDetalle = await eliminarTopDetallePorTopId(id);
                if (eliminarDetalle.ok) {
                    response = buildContainer(true, '', null, null);
                }
            }
        }
        if (response === null) {
            throw new Error('No se pudo eliminar top item');
        }
        return response;
    } catch (error) {
        throw error;
    }
}

<<<<<<< HEAD
async function likesTopItem(TopItemId = 0, updatedDate, createdBy, flagLike = false) {
=======
async function likesTopItem(TopItemId = 0, updatedAt, createdBy, flagLike = false) {
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
    try {
        let response = null;
        if (TopItemId > 0) {
            let TopItemLikeBd = await TopItemLikeDTO.findOne({
                where: { TopItemId, UsuarioId: createdBy }
                , attributes: ['id', 'flagActive', 'flagEliminate']
            });
            if (TopItemLikeBd) {
                let queryObject = {
<<<<<<< HEAD
                    updatedDate
=======
                    updatedAt
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
                };
                if (flagLike) {
                    queryObject.flagActive = true;
                    queryObject.flagEliminate = false;
                } else {
                    queryObject.flagActive = false;
                    queryObject.flagEliminate = true;
                }

                await TopItemLikeDTO.update(queryObject
                    , { where: { id: TopItemLikeBd.id } });

            } else {
                const newTopItemLikeBd = await TopItemLikeDTO.create({
                    flagActive: true,
                    flagEliminate: false,
                    TopItemId,
                    UsuarioId: createdBy,
<<<<<<< HEAD
                    createdDate: updatedDate,
                    updatedDate
                }, {
                    fields: ['flagActive', 'flagEliminate', 'TopItemId', 'UsuarioId', 'createdDate', 'updatedDate']
=======
                    createdAt: updatedAt,
                    updatedAt
                }, {
                    fields: ['flagActive', 'flagEliminate', 'TopItemId', 'UsuarioId', 'createdAt', 'updatedAt']
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
                });

            }

            response = buildContainer(true, '', null, null);
        }
        if (response === null) {
            throw new Error('No se pudo actualizar top');
        }
        return response;
    } catch (error) {
        throw error;
    }
}
/* TOP ITEM DETALLE */

async function uploadFileTopItemDetalle(topItemDetalle, files) {
    try {
        let response = null;
        let bucketName = "its-top5-bucket-client";
        if (files) {
<<<<<<< HEAD
            let { id, path, nameImageDefault = "", updatedDate, createdBy } = topItemDetalle;
            let TopItemId = id;

            // eliminar imagenes anteriores
            let response_1 = await eliminarTopItemDetalleByTopItem(TopItemId, updatedDate, createdBy);
=======
            let { id, path, nameImageDefault = "", updatedAt, createdBy } = topItemDetalle;
            let TopItemId = id;

            // eliminar imagenes anteriores
            let response_1 = await eliminarTopItemDetalleByTopItem(TopItemId, updatedAt, createdBy);
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840

            if (response_1.ok) {
                for (const file of files) {
                    const { name, size, mimetype } = file;
                    let key = `topItem/${TopItemId}/${path}/${name}`;
                    const { Location } = await uploadToS3(file, bucketName, key);

                    let TopItemDetalle = {
                        rutaImagen: Location,
                        flagImagenDefaultTop: false,
<<<<<<< HEAD
                        updatedDate,
                        createdBy,
                        createdDate: updatedDate,
=======
                        updatedAt,
                        createdBy,
                        createdAt: updatedAt,
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
                        TopItemId
                    };

                    if (files.length === 1) {
                        TopItemDetalle.flagImagenDefaultTop = true;
                    } else if (nameImageDefault !== "") {
                        TopItemDetalle.flagImagenDefaultTop = (name == nameImageDefault);
                    }

                    createOrUpdateTopItemDetalle(TopItemDetalle);
                }

                response = buildContainer(true, '', null, null);
            }
        }
        return response;
    } catch (error) {
        throw error;
    }
}

async function createOrUpdateTopItemDetalle(TopItemDetalle) {
    try {
        let queryObject = {
            rutaImagen: TopItemDetalle.rutaImagen
            , flagImagenDefaultTop: TopItemDetalle.flagImagenDefaultTop
            , flagActive: true
            , flagEliminate: false
<<<<<<< HEAD
            , updatedDate: TopItemDetalle.updatedDate
=======
            , updatedAt: TopItemDetalle.updatedAt
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
        };

        if (TopItemDetalle.id) {
            queryObject.updatedBy = TopItemDetalle.createdBy;
<<<<<<< HEAD
            await TopItemDetalleDTO.update(queryObject, { where: { id: TopItemDetalle.id } });
            var dataValues = TopItemDetalle;
        } else {
            queryObject.createdBy = TopItemDetalle.createdBy;
            queryObject.createdDate = TopItemDetalle.createdDate;
            queryObject.TopItemId = TopItemDetalle.TopItemId;

            var { dataValues } = await TopItemDetalleDTO.create(queryObject, {
                fields: ['rutaImagen', 'flagImagenDefaultTop', 'flagActive', 'flagEliminate', 'createdBy', 'createdDate', 'updatedDate', 'TopItemId']
=======
            var { dataValues } = await TopItemDetalleDTO.update(queryObject, { where: { id: TopItemDetalle.id } });
        } else {
            queryObject.createdBy = TopItemDetalle.createdBy;
            queryObject.createdAt = TopItemDetalle.createdAt;
            queryObject.TopItemId = TopItemDetalle.TopItemId;

            var { dataValues } = await TopItemDetalleDTO.create(queryObject, {
                fields: ['rutaImagen', 'flagImagenDefaultTop', 'flagActive', 'flagEliminate', 'createdBy', 'createdAt', 'updatedAt', 'TopItemId']
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
            });
        }
        return buildContainer(true, '', dataValues, null);
    } catch (error) {
        throw error;
    }
}
<<<<<<< HEAD
async function eliminarTopItemDetalleByTopItem(TopItemId, updatedDate, createdBy) {
=======
async function eliminarTopItemDetalleByTopItem(TopItemId, updatedAt, createdBy) {
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
    try {
        let response = null;
        if (TopItemId) {
            await TopItemDetalleDTO.update({
                flagActive: false
                , flagEliminate: true
<<<<<<< HEAD
                , updatedDate: updatedDate
=======
                , updatedAt: updatedAt
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
                , updatedBy: createdBy
            }, { where: { TopItemId, flagActive: true } });
            response = buildContainer(true, '', null, null);
        }
        if (response === null) {
            throw new Error('No se pudo eliminar top detalle');
        }
        return response;
    } catch (error) {
        throw error;
    }
}


async function listarTopItemAutocomplete(objParams) {
    try {
        let response = null;
        let topItemBD = null;
        let { pageNumber, pageSize, keyword } = objParams;

        if (keyword != "") {
            keyword = util.alwaysParseString(keyword);
            var listTopItemBD = models.sequelize.query(`SELECT "TopItem"."id"
            FROM "Top"
            INNER JOIN "TopItem" ON "Top"."id" = "TopItem"."TopId"
            INNER JOIN "Lugar" ON "TopItem"."LugarId" = "Lugar"."id"
            INNER JOIN "Categoria" ON "Top"."CategoriaId" = "Categoria"."id"
            WHERE
            "Top"."flagPublicado" = true
			AND "Top"."flagActive" = true
            AND "TopItem"."flagActive" = true
            AND "Lugar"."flagActive" = true
            AND "Categoria"."flagActive" = true
            AND 
            (
                REPLACE_FILTRO_BUSCADOR("Top"."titulo") LIKE :keyword
                OR REPLACE_FILTRO_BUSCADOR("TopItem"."descripcion") LIKE :keyword
                OR REPLACE_FILTRO_BUSCADOR("Lugar"."name") LIKE :keyword
                OR REPLACE_FILTRO_BUSCADOR("Categoria"."name") LIKE :keyword
             )
             GROUP BY "TopItem"."id"`, {
                replacements: { keyword: `%${keyword}%` },
                type: models.sequelize.QueryTypes.SELECT
            });
            listTopItemBD = await listTopItemBD.map(x => x.id);

            if (listTopItemBD.length > 0) {
                console.log(listTopItemBD);
                let queryObject = {
                    where: { flagActive: true, id: listTopItemBD }
<<<<<<< HEAD
                    , attributes: ['id', 'descripcion', 'valoracion', 'LugarId', 'createdBy', 'updatedDate', 'updatedDateStr']
                    , include: [{
                        model: TopDTO
                        , where: { flagActive: true, flagPublicado: true }
                        , attributes: ['id', 'titulo', 'fechaPublicado', 'fechaPublicadoStr', 'updatedDate']
=======
                    , attributes: ['id', 'descripcion', 'valoracion', 'LugarId', 'createdBy', 'updatedAt', 'updatedAtStr']
                    , include: [{
                        model: TopDTO
                        , where: { flagActive: true, flagPublicado: true }
                        , attributes: ['id', 'titulo', 'fechaPublicado', 'fechaPublicadoStr', 'updatedAt']
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
                        , include: [{
                            required: true
                            , model: models.Categoria
                            , as: 'Categoria'
                            , where: { flagActive: true }
                            , attributes: []
                        }]
                    }, {
                        model: TopItemDetalleDTO,
                        required: false,
                        attributes: ['id', 'rutaImagen', 'flagImagenDefaultTop'],
                        where: { flagActive: true }
                    }, {
                        model: models.Lugar,
                        attributes: ['id', 'name', 'address', 'latitude', 'longitude']
                    }, {
                        required: false,
                        where: { flagActive: true },
                        model: TopItemLikeDTO,
                        attributes: ['id', 'UsuarioId']
                    }]
<<<<<<< HEAD
                    , order: [['updatedDate', 'DESC']]
=======
                    , order: [['updatedAt', 'DESC']]
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
                };

                queryObject.offset = ((pageNumber - 1) * pageSize);
                queryObject.limit = pageSize;
                // console.log(queryObject);
                topItemBD = await TopItemDTO.findAll(queryObject);
                let totalRows = topItemBD.length || 0;
                if (totalRows) {
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
                    response = buildContainer(true, '', { dataValues: [], totalRows: 0 }, null);
                }
            } else {
                response = buildContainer(true, '', { dataValues: [], totalRows: 0 }, null);
            }


        } else {
            response = buildContainer(true, '', { dataValues: [], totalRows: 0 }, null);
        }
        return response;
    } catch (error) {
        throw error;
    }
}

async function listarOptionsAutocomplete(keyword = "") {
    try {
        let response = null;

        // var obj = {
        //     order: [['descripcion', 'ASC']]
        // };

        if (keyword != "") {
            keyword = util.alwaysParseString(keyword);

            var listTopBD = models.sequelize.query(`SELECT "titulo" FROM "Top" WHERE REPLACE_FILTRO_BUSCADOR("Top"."titulo") LIKE :keyword`, {
                replacements: { keyword: `%${keyword}%` },
                type: models.sequelize.QueryTypes.SELECT
            });

            var listTopItemBD = models.sequelize.query(`SELECT "descripcion" FROM "TopItem" WHERE REPLACE_FILTRO_BUSCADOR("TopItem"."descripcion") LIKE :keyword`, {
                replacements: { keyword: `%${keyword}%` },
                type: models.sequelize.QueryTypes.SELECT
            });

            var listLugarBD = models.sequelize.query(`SELECT "name" FROM "Lugar" WHERE REPLACE_FILTRO_BUSCADOR("Lugar"."name") LIKE :keyword`, {
                replacements: { keyword: `%${keyword}%` },
                type: models.sequelize.QueryTypes.SELECT
            });

            var listCategoriaBD = models.sequelize.query(`SELECT "name" FROM "Categoria" WHERE REPLACE_FILTRO_BUSCADOR("Categoria"."name") LIKE :keyword`, {
                replacements: { keyword: `%${keyword}%` },
                type: models.sequelize.QueryTypes.SELECT
            });

            listTopBD = await listTopBD.map((x) => x.titulo);
            listTopItemBD = await listTopItemBD.map((x) => x.descripcion);
            listLugarBD = await listLugarBD.map((x) => x.name);
            listCategoriaBD = await listCategoriaBD.map((x) => x.name);

            response = buildContainer(true, '', { dataValues: [].concat(listTopBD, listTopItemBD, listLugarBD, listCategoriaBD) }, null);
        } else {
            response = buildContainer(true, '', { dataValues: [] }, null);
        }
        return response;
    } catch (error) {
        throw error;
    }
}

/* OTROS */
async function getOneTop(id, createdBy) {
    try {
        let response = null;
        let topBD = null;
        topBD = await TopDTO.findOne({
            where: { id, createdBy, flagActive: true }
<<<<<<< HEAD
            , attributes: ['id', 'titulo', 'flagPublicado', 'fechaPublicado', 'fechaPublicadoStr', 'updatedDate', 'updatedDateStr']
=======
            , attributes: ['id', 'titulo', 'flagPublicado', 'fechaPublicado', 'fechaPublicadoStr', 'updatedAt', 'updatedAtStr']
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
            , include: [{
                model: models.Categoria
                , as: 'Categoria'
                , where: { flagActive: true }
<<<<<<< HEAD
                , attributes: ['id', 'name', 'updatedDate']
            }]
            , order: [['fechaPublicado', 'DESC'], ['updatedDate', 'DESC']]
=======
                , attributes: ['id', 'name', 'updatedAt']
            }]
            , order: [['fechaPublicado', 'DESC'], ['updatedAt', 'DESC']]
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
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
async function getOneTopItem(id, createdBy) {
    try {
        let response = null;
        let topBD = null;
        topBD = await TopItemDTO.findOne({
            where: { id, createdBy, flagActive: true }
<<<<<<< HEAD
            , attributes: ['id', 'descripcion', 'valoracion', 'LugarId', 'createdBy', 'updatedDate', 'updatedDateStr']
=======
            , attributes: ['id', 'descripcion', 'valoracion', 'LugarId', 'createdBy', 'updatedAt', 'updatedAtStr']
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
            , include: [{
                model: TopItemDetalleDTO
                , where: { flagActive: true }
                , attributes: ['id', 'TopItemId', 'rutaImagen']
            }]
        });
        if (topBD) {
            response = buildContainer(true, '', topBD, null);
        } else {
            throw new Error("Top item no existe");
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
<<<<<<< HEAD
            , updatedDate: objTopItem.updatedDate
=======
            , updatedAt: objTopItem.updatedAt
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
        };

        if (objTopItem.id) {
            queryObject.updatedBy = objTopItem.createdBy;
            await TopItemDTO.update(queryObject, { where: { id: objTopItem.id } });
            var dataValues = objTopItem;

        } else {
            queryObject.createdBy = objTopItem.createdBy;
<<<<<<< HEAD
            queryObject.createdDate = objTopItem.createdDate;

            var { dataValues } = await TopItemDTO.create(queryObject, {
                fields: ['descripcion', 'valoracion', 'LugarId', 'TopId', 'flagActive', 'flagEliminate', 'updatedDate', 'createdBy', 'createdDate']
=======
            queryObject.createdAt = objTopItem.createdAt;

            var { dataValues } = await TopItemDTO.create(queryObject, {
                fields: ['descripcion', 'valoracion', 'LugarId', 'TopId', 'flagActive', 'flagEliminate', 'updatedAt', 'createdBy', 'createdAt']
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
            });
        }
        return buildContainer(true, '', dataValues, null);
    } catch (error) {
        throw error;
    }
}
<<<<<<< HEAD
async function eliminatedAndcreateOrUpdateTopItemDetalle(TopId, createdBy, updatedDate, objListTopItemDetalle, files, idsEliminar, transact) {
    try {
        let response = null;
        if (objListTopItemDetalle) {
            let responseEliminarTopItemDetalle = await eliminarTopItemDetalle(updatedDate, idsEliminar, transact);
=======
async function eliminatedAndcreateOrUpdateTopItemDetalle(TopId, createdBy, updatedAt, objListTopItemDetalle, files, idsEliminar, transact) {
    try {
        let response = null;
        if (objListTopItemDetalle) {
            let responseEliminarTopItemDetalle = await eliminarTopItemDetalle(updatedAt, idsEliminar, transact);
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
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
<<<<<<< HEAD
                            , updatedDate: updatedDate
=======
                            , updatedAt: updatedAt
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
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
<<<<<<< HEAD
                            , createdDate: updatedDate
                            , updatedDate: updatedDate
                        };
                        queryObject.fields = ['rutaImagen', 'flagImagenDefaultTop', 'flagActive', 'flagEliminate', 'createdBy', 'createdDate', 'updatedDate'];
=======
                            , createdAt: updatedAt
                            , updatedAt: updatedAt
                        };
                        queryObject.fields = ['rutaImagen', 'flagImagenDefaultTop', 'flagActive', 'flagEliminate', 'createdBy', 'createdAt', 'updatedAt'];
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
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
<<<<<<< HEAD
async function eliminarTopItemDetalle(updatedDate, idsEliminar, transact) {
=======
async function eliminarTopItemDetalle(updatedAt, idsEliminar, transact) {
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
    try {
        let response = null;

        let queryObject = {
            flagActive: false
            , flagEliminate: true
            , flagImagenDefaultTop: false
<<<<<<< HEAD
            , updatedDate: updatedDate
=======
            , updatedAt: updatedAt
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
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
<<<<<<< HEAD
// async function eliminarTopItem(id, updatedDate, createdBy) {
=======
// async function eliminarTopItem(id, updatedAt, createdBy) {
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
//     try {
//         let response = null;
//         let TopBd = null;
//         if (id) {
//             await TopBd.update({
//                 flagActive: false
//                 , flagEliminate: true
<<<<<<< HEAD
//                 , updatedDate
=======
//                 , updatedAt
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
//             }, {
//                 where: {
//                     id, createdBy
//                 }
//             });
//             let eliminarDetalle = await eliminarTopDetallePorTopId(id);
//             if (eliminarDetalle.ok) {
//                 response = buildContainer(true, 'Eliminado correctamente.', null, null);
//             }

//         }
//         if (response === null) {
//             throw new Error('No se pudo eliminar top');
//         }
//         return response;
//     } catch (error) {
//         throw error;
//     }
// }
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
<<<<<<< HEAD
            , order: [['updatedDate', 'DESC']]
=======
            , order: [['updatedAt', 'DESC']]
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
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
<<<<<<< HEAD
                , order: [['updatedDate', 'DESC']]
=======
                , order: [['updatedAt', 'DESC']]
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
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
<<<<<<< HEAD
            , attributes: ['id', 'LugarId', 'categoriaId', 'titulo', 'updatedDate']
=======
            , attributes: ['id', 'LugarId', 'categoriaId', 'titulo', 'updatedAt']
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
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
<<<<<<< HEAD
            , order: [['updatedDate', 'DESC']]
=======
            , order: [['updatedAt', 'DESC']]
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
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
<<<<<<< HEAD
            }, order: [['updatedDate', 'DESC']]
=======
            }, order: [['updatedAt', 'DESC']]
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
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
<<<<<<< HEAD
            , order: [['updatedDate', 'DESC']]
=======
            , order: [['updatedAt', 'DESC']]
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
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
<<<<<<< HEAD
            }, order: [['updatedDate', 'DESC']]
=======
            }, order: [['updatedAt', 'DESC']]
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
        });
        response = buildContainer(true, '', topItemDetalleBD, null);
        return response;
    } catch (error) {
        throw error;
    }
}
<<<<<<< HEAD
async function eliminarTopDetallePorTopId(id, updatedDate) {
=======
async function eliminarTopDetallePorTopId(id, updatedAt) {
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
    try {
        let response = null;
        if (id) {
            await TopItemDetalleDTO.update({
                flagActive: false
                , flagEliminate: true
<<<<<<< HEAD
                , updatedDate: updatedDate
=======
                , updatedAt: updatedAt
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
            }, {
                where: {
                    TopItemId: id
                }
            });
            response = buildContainer(true, '', null, null);
        }
        if (response === null) {
            throw new Error('No se pudo eliminar top detalle');
        }
        return response;
    } catch (error) {
        throw error;
    }
}
async function createOrUpdateTopItemIgnore({ objLugar, objTopItem, objListTopItemDetalle, files }) {
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

module.exports = {
    createOrUpdateTop,
<<<<<<< HEAD
=======
    updateOrderItems,
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
    listarTopPorUsuario,
    listarTopDetallePorTopItem,
    eliminarTop,


    listarTopItemByLugar,

    listarTopItemByTop,
    createOrUpdateTopItem,
    createOrUpdateTopItemDetalle,
    eliminarTopItem,

    uploadFileTopItemDetalle,

    listarTopItemAutocomplete,
    likesTopItem,

    listarTopPorUsuarioPorCategoria,
    listarTopPorUsuarioPorFiltro,
    listarTopGeneral,
    publicarTop,
    getOneTop,
    getOneTopItem,
    listarTopByLugarByCategoria,

    listarTopPublicadoPorUsuario,
    listarOptionsAutocomplete
}