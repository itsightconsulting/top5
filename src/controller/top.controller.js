import models from '../orm.database/models/index';
import util from '../utilitarios/utilitarios';
import { buildContainer, uploadToS3 } from './common.controller';
const TopDTO = models.Top;
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
        // if (cantidad) {

        // } else {
        // sequelize.query("UPDATE users SET y = 42 WHERE x = 12")
        topBD = await TopDTO.findAll({
            where: {
                createdBy: correoElectronico,
                flagActive: true
            }, order: [['updatedAt', 'DESC']]
        });
        // }
        return topBD;
    } catch (error) {
        throw error;
    }
}
async function listarTopGeneral(categoriaId, cantidad) {
    try {
        let topBD = null;
        if (cantidad) {
            topBD = await TopDTO.findAll({
                where: {
                    categoriaId,
                    flagActive: true
                },
                // include: [{ model: models.TopReaccion }]
            });
        } else {
            topBD = await TopDTO.findAll({
                where: {
                    categoriaId,
                    flagActive: true
                }, order: [['updatedAt', 'DESC']]
            });
        }
        return topBD;
    } catch (error) {
        throw error;
    }
}
async function listarTopPorUsuarioPorCategoria(categoriaId, correoElectronico) {
    try {
        let topBDListado = await TopDTO.findAll({
            where: {
                createdBy: correoElectronico,
                categoriaId,
                flagActive: true
            }, order: [['updatedAt', 'DESC']]
        });
        // TODO obtener foto default
        return topBDListado;
    } catch (error) {
        throw error;
    }
}
async function listarTopPorUsuarioPorFiltro(filtro, correoElectronico) {
    try {
        let topBDListado = await TopDTO.findAll({
            where: {
                createdBy: correoElectronico,
                flagActive: true,
                // [Op.or]: [{ Titulo: { [Op.like]: filtro } }, { Descripcion: { [Op.like]: filtro } }]
            }, order: [['updatedAt', 'DESC']]
        });
        // TODO obtener foto default
        return topBDListado;
    } catch (error) {
        throw error;
    }
}
async function listarTopDetallePorTop(id) {
    try {
        let topDetalleBD = await TopDetalleDTO.findAll({
            where: {
                id,
                flagActive: true
            }, order: [['updatedAt', 'DESC']]
        });
        return topDetalleBD;
    } catch (error) {
        throw error;
    }
}
async function crearTop(objTop, objTopDetalle) {
    try {
        let response = null;
        // let objTop = data.Top;
        // let objTopDetalle = data.TopDetalle;
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
            objTopDetalle.id = topBD.id;
            let topDetalleBd = await crearTopDetalle(objTopDetalle);
            if (topDetalleBd.ok) {
                response = buildContainer(true, 'Top creado correctamente.', null, null);
            }
        }

        if (response === null) {
            throw new Error('No se pudo crear top');
        }
        return response;
    } catch (error) {
        console.log("controller crearTop(error):", error);
        throw error;
    }
}
async function crearTopDetalle(data) {
    try {
        let response = null;
        let TopDetalleBd = null;
        if (data.id) {
            TopDetalleBd = await obtenerTop(objTop.id);
            if (TopDetalleBd) {
                await TopDetalleBd.update({
                    rutaImagen: data.rutaImagen
                    , flagImagenDefaultTop: data.flagImagenDefaultTop
                    , flagActive: true
                    , FlagEliminate: false
                    , updatedAt: util.get_Date()
                });
            }
        } else {
            TopDetalleBd = await TopDetalleDTO.create({
                TopId: data.TopId
                , rutaImagen: data.rutaImagen
                , FlagImagenDefaultTop: data.flagImagenDefaultTop
                , flagActive: true
                , FlagEliminate: false
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
        console.log("controller crearTopDetalle(error):", error);
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
        console.log("controller eliminarTopDetalle(error):", error);
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
                    id
                }
            });
            response = buildContainer(true, 'Eliminado correctamente.', null, null);
        }
        if (response === null) {
            throw new Error('No se pudo eliminar top detalle');
        }
        return response;
    } catch (error) {
        console.log("controller eliminarTopDetallePorTopId(error):", error);
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
        console.log("controller eliminarTop(error):", error);
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
    listarTopGeneral
}