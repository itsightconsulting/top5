import models from '../database/database';
import util from '../utilitarios/utilitarios';
import { buildContainer, uploadToS3 } from './common.controller';
const TopDTO = models.Top;
const TopDetalleDTO = models.TopDetalle;

async function obtenerTopDetalle(id) {
    try {
        let topDetalleBD = await TopDetalleDTO.findOne({
            where: {
                TopDetalleId: id
            }
            , order: [['FechaCreacion', 'DESC']]
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
                TopId: id
            }
            , order: [['FechaCreacion', 'DESC']]
        });
        return topBD;
    } catch (error) {
        throw error;
    }
}

async function obtenerTopPorUsuario(correoElectronico) {
    try {
        let topBD = await TopDTO.findAll({
            where: {
                CreadoPor: correoElectronico,
                FlagActivo: true
            }, order: [['FechaCreacion', 'DESC']]
        });
        return topBD;
    } catch (error) {
        throw error;
    }
}
async function obtenerTopDetallePorTop(id) {
    try {
        let topDetalleBD = await TopDetalleDTO.findAll({
            where: {
                TopId: id,
                FlagActivo: true
            }, order: [['FechaCreacion', 'DESC']]
        });
        return topDetalleBD;
    } catch (error) {
        throw error;
    }
}

async function crearTop(data) {
    try {
        let response = null;
        let objTop = data.Top;
        let objTopDetalle = data.TopDetalle;
        let topBD = null;
        if (objTop.TopId) {
            topBD = await obtenerTop(objTop.TopId);
            if (topBD) {
                await topBD.update({
                    Titulo: objTop.Titulo
                    , Descripcion: objTop.Descripcion
                    , CategoriaId: objTop.CategoriaId
                    , Valoracion: objTop.Valoracion
                    , FlagPublicado: objTop.FlagPublicado
                    , CantLike: objTop.CantLike
                    , LugarId: objTop.LugarId
                    , FlagActivo: true
                    , FlagEliminado: false
                    , ModificadoPor: objTop.ModificadoPor
                    , FechaModificacion: util.get_Date()
                }, {
                    fields: ['Titulo', 'Descripcion', 'CategoriaId', 'Valoracion', 'FlagPublicado', 'CantLike', 'LugarId', 'FlagActivo', 'FlagEliminado', 'ModificadoPor', 'FechaModificacion']
                });
            }

        } else {
            topBD = await TopDTO.create({
                Titulo: objTop.Titulo
                , Descripcion: objTop.Descripcion
                , CategoriaId: objTop.CategoriaId
                , Valoracion: objTop.Valoracion
                , FlagPublicado: objTop.FlagPublicado
                , CantLike: objTop.CantLike
                , LugarId: objTop.LugarId
                , FlagActivo: true
                , FlagEliminado: false
                , CreadoPor: objTop.CreadoPor
                , FechaCreacion: util.get_Date()
            }, {
                fields: ['Titulo', 'Descripcion', 'CategoriaId', 'Valoracion', 'FlagPublicado', 'CantLike', 'LugarId', 'FlagActivo', 'FlagEliminado', 'CreadoPor', 'FechaCreacion']
            });

        }

        if (topBD) {
            objTopDetalle.TopId = topBD.TopId;
            let topDetalleBd = await crearTopDetalle(objTopDetalle);
            if (topDetalleBd.ok) {
                response = buildContainer(true, 'Top creado correctamente.', null, token);
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
        if (data.TopDetalleId) {
            TopDetalleBd = await obtenerTop(objTop.TopDetalleId);
            if (TopDetalleBd) {
                await TopDetalleBd.update({
                    RutaImagen: data.RutaImagen
                    , FlagImagenDefaultTop: data.FlagImagenDefaultTop
                    , FlagActivo: true
                    , FlagEliminado: false
                    , ModificadoPor: data.ModificadoPor
                    , FechaModificacion: util.get_Date()
                }, {
                    fields: ['RutaImagen', 'FlagImagenDefaultTop', 'FlagActivo', 'FlagEliminado', 'ModificadoPor', 'FechaModificacion']
                });
            }
        } else {
            TopDetalleBd = await TopDetalleDTO.create({
                TopId: data.TopId
                , RutaImagen: data.RutaImagen
                , FlagImagenDefaultTop: data.FlagImagenDefaultTop
                , FlagActivo: true
                , FlagEliminado: false
                , CreadoPor: data.CreadoPor
                , FechaCreacion: util.get_Date()
            }, {
                fields: ['TopId', 'RutaImagen', 'FlagImagenDefaultTop', 'Valoracion', 'FlagActivo', 'FlagEliminado', 'CreadoPor', 'FechaCreacion']
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
async function eliminarTopDetalle(id, modificadoPor) {
    try {
        let response = null;
        let TopDetalleBd = null;
        if (id) {
            TopDetalleBd = await obtenerTopDetalle(id);
            if (TopDetalleBd) {
                await TopDetalleBd.update({
                    FlagActivo: false
                    , FlagEliminado: true
                    , ModificadoPor: modificadoPor
                    , FechaModificacion: util.get_Date()
                }, {
                    fields: ['FlagActivo', 'FlagEliminado', 'ModificadoPor', 'FechaModificacion']
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

async function eliminarTopDetallePorTopId(topId, modificadoPor) {
    try {
        let response = null;
        let topDetalleBdList = null;
        if (id) {
            topDetalleBdList = await obtenerTopDetallePorTop(topId);
            if (topDetalleBdList) {
                topDetalleBdList.forEach(topDetalle => {
                    await topDetalle.update({
                        FlagActivo: false
                        , FlagEliminado: true
                        , ModificadoPor: modificadoPor
                        , FechaModificacion: util.get_Date()
                    }, {
                        fields: ['FlagActivo', 'FlagEliminado', 'ModificadoPor', 'FechaModificacion']
                    });
                });
                response = buildContainer(true, 'Eliminado correctamente.', null, null);
            }
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
async function eliminarTop(id, modificadoPor) {
    try {
        let response = null;
        let TopBd = null;
        if (id) {
            TopBd = await obtenerTop(id);
            if (TopBd) {
                await TopBd.update({
                    FlagActivo: false
                    , FlagEliminado: true
                    , ModificadoPor: modificadoPor
                    , FechaModificacion: util.get_Date()
                }, {
                    fields: ['FlagActivo', 'FlagEliminado', 'ModificadoPor', 'FechaModificacion']
                });
                let eliminarDetalle = await eliminarTopDetallePorTopId(id, modificadoPor);
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
    obtenerTopPorUsuario,
    obtenerTopDetallePorTop,
    eliminarTopDetalle,
    eliminarTop
}