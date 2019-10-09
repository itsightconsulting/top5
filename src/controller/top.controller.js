import models from '../orm.database/models/index';
import util from '../utilitarios/utilitarios';
import { buildContainer, uploadToS3 } from './common.controller';
const TopDTO = models.Top;;
const TopDetalleDTO = models.TopDetalle;

async function obtenerTopDetalle(id) {
    try {
        let topDetalleBD = await TopDetalleDTO.findOne({
            where: {
                id
            }
        });
        return topDetalleBD;
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
async function listarTopPorUsuario(correoElectronico, cantidad) {
    try {
        let topBD = null;
        let response = null;
        // if (cantidad) {

        // } else {
        topBD = await TopDTO.findAll({
            where: { createdBy: correoElectronico, flagActive: true }
            , include: [{
                model: TopDetalleDTO
                , where: {
                    flagImagenDefaultTop: true
                }
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
                    model: TopDetalleDTO
                    , where: {
                        flagImagenDefaultTop: true
                    }
                }]
            });
        } else {
            topBD = await TopDTO.findAll({
                where: {
                    categoriaId,
                    flagActive: true
                }
                , include: [{
                    model: TopDetalleDTO
                    , where: {
                        flagImagenDefaultTop: true
                    }
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
async function listarTopPorUsuarioPorCategoria(categoriaId, correoElectronico) {
    try {
        let response = null;
        let topBDListado = await TopDTO.findAll({
            where: {
                createdBy: correoElectronico,
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
async function listarTopPorUsuarioPorFiltro(filtro, correoElectronico) {
    try {
        let response = null;
        let topBDListado = await TopDTO.findAll({
            where: {
                createdBy: correoElectronico,
                flagActive: true,
                // [Op.or]: [{ Titulo: { [Op.like]: filtro } }, { Descripcion: { [Op.like]: filtro } }]
            }, order: [['updatedAt', 'DESC']]
        });
        // TODO obtener foto default
        response = buildContainer(true, '', topBDListado, null);
        return response;
    } catch (error) {
        throw error;
    }
}
async function listarTopDetallePorTop(id) {
    try {
        let response = null;
        let topDetalleBD = await TopDetalleDTO.findAll({
            where: {
                TopId: id,
                flagActive: true
            }, order: [['updatedAt', 'DESC']]
        });
        response = buildContainer(true, '', topDetalleBD, null);
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
                let topDetalleBd = await crearTopDetalle(element);
                if (!topDetalleBd.ok) {
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
        let TopDetalleBd = null;
        if (topDetalle.id) {
            TopDetalleBd = await obtenerTopDetalle(topDetalle.id);
            if (TopDetalleBd) {
                await TopDetalleBd.update({
                    rutaImagen: topDetalle.rutaImagen
                    , flagImagenDefaultTop: topDetalle.flagImagenDefaultTop
                    , flagActive: true
                    , flagEliminate: false
                    , updatedBy: topDetalle.createdBy
                    , updatedAt: util.get_Date()
                });
            }
        } else {
            TopDetalleBd = await TopDetalleDTO.create({
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

        if (TopDetalleBd) {
            response = buildContainer(true, 'Creado correctamente.', TopDetalleBd, null);
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
        let TopDetalleBd = null;
        if (id) {
            TopDetalleBd = await obtenerTopDetalle(id);
            if (TopDetalleBd) {
                await TopDetalleBd.update({
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
            await TopDetalleDTO.update({
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
                model: TopDetalleDTO
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
    listarTopDetallePorTop,
    eliminarTopDetalle,
    eliminarTop,
    listarTopPorUsuarioPorCategoria,
    listarTopPorUsuarioPorFiltro,
    listarTopGeneral,
    publicarTop,
    getOneTop
}