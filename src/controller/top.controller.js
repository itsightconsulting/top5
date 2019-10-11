import models from '../orm.database/models/index';
import util from '../utilitarios/utilitarios';
import { buildContainer, uploadToS3 } from './common.controller';
const TopDTO = models.Top;
const TopItemDTO = models.TopItem;
const TopItemDetalleDTO = models.TopItemDetalle;
const Op = models.Sequelize.Op;

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
async function listarTopPorUsuario(createdBy, cantidad) {
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
async function crearTop(objTop, objTopDetalle) {
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
async function eliminarTop(id) {
    try {
        let response = null;
        let TopBd = null;
        if (id) {
            TopBd = await obtenerTop(id);
            if (TopBd) {
                await TopBd.update({
                    flagActive: false
                    , flagEliminate: true
                    , updatedAt: util.get_Date()
                }, {
                    where: {
                        id
                    }
                });
                let eliminarDetalle = await eliminarTopDetallePorTopId(id);
                if (eliminarDetalle.ok) {
                    response = buildContainer(true, 'Eliminado correctamente.', null, null);
                }
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
async function publicarTop(id) {
    try {
        let response = null;
        if (id) {
            await TopDTO.update({
                flagPublicado: true
                , updatedAt: util.get_Date()
            }, { where: { id } });
            response = buildContainer(true, 'Publicado correctamente.', null, null);
        }
        if (response === null) {
            throw new Error('No se pudo publicar top');
        }
        return response;
    } catch (error) {
        throw error;
    }
}
async function getOneTop(id) {
    try {
        let response = null;
        let topBD = null;
        topBD = await TopDTO.findOne({
            where: {
                id,
                flagActive: true
            }
            , include: [{
                model: TopItemDetalleDTO
                , where: {
                    flagImagenDefaultTop: true
                }
            }]
        });
        response = buildContainer(true, '', topBD, null);
        return response;
    } catch (error) {
        throw error;
    }
}
module.exports = {
    crearTop,
    listarTopPorUsuario,
    listarTopDetallePorTopItem,
    eliminarTopDetalle,
    eliminarTop,
    listarTopPorUsuarioPorCategoria,
    listarTopPorUsuarioPorFiltro,
    listarTopGeneral,
    publicarTop,
    getOneTop,
    listarTopByLugarByCategoria
}