import controller from '../controller/top.controller';
import { buildContainer, existeJsonData, controlError } from '../controller/common.controller';

async function createOrUpdateTop(req, res) {
    try {
        existeJsonData(req, res);
        let data = req.body.data;
        let objTop = {
            id: data.id
            , titulo: data.titulo
            , createdBy: data.createdBy
            , CategoriaId: data.CategoriaId
        };

        // let files = [];
        // if (req.files) {
        //     files = [].concat(req.files.image);
        // }
        let response = await controller.createOrUpdateTop(objTop);
        return res.status(200).send(response);
    } catch (error) {
        controlError("createOrUpdateTop", error);
        res.status(500).send(buildContainer(false, error.message, null, null));
    }
}
async function listarTopPorUsuario(req, res) {
    try {
        existeJsonData(req, res);
        let data = req.body.data;
        let objParams = {
            createdBy: data.createdBy
            , pageNumber: data.pageNumber
            , pageSize: data.pageSize
            , CategoriaId: data.CategoriaId
            , flagPublicado: data.flagPublicado
        }
        let response = await controller.listarTopPorUsuario(objParams);
        return res.status(200).send(response);
    } catch (error) {
        controlError("listarTopPorUsuario", error);
        res.status(500).send(buildContainer(false, error.message, null, null));
    }
}
async function publicarTop(req, res) {
    try {
        existeJsonData(req, res);
        const { id, updatedAt, createdBy, flagPublicado } = req.body.data;
        let response = await controller.publicarTop(id, updatedAt, createdBy, flagPublicado);
        return res.status(200).send(response);
    } catch (error) {
        controlError("publicarTop", error);
        res.status(500).send(buildContainer(false, error.message, null, null));
    }
}
async function eliminarTop(req, res) {
    try {
        const { id, updatedAt, createdBy } = req.body.data;
        let response = await controller.eliminarTop(id, updatedAt, createdBy);
        return res.status(200).send(response);
    } catch (error) {
        controlError("eliminarTop", error);
        res.status(500).send(buildContainer(false, error.message, null, null));
    }
}


async function createOrUpdateTopItem(req, res) {
    try {
        existeJsonData(req, res);
        let { top, lugar, topItem } = req.body.data;
        if (top && lugar && topItem) {
            let response = await controller.createOrUpdateTopItem({ top, lugar, topItem });
            return res.status(200).send(response);
        } else {
            throw new Error("Asegurese que los parámetros enviados esten completos");
        }


    } catch (error) {
        controlError("crearTop", error);
        res.status(500).send(buildContainer(false, error.message, null, null));
    }
}
async function listarTopPublicadoPorUsuario(req, res) {
    try {
        existeJsonData(req, res);

        let { createdBy, pageNumber, pageSize, CategoriaId, flagPublicado } = req.body.data;
        let response = await controller.listarTopPublicadoPorUsuario({ createdBy, pageNumber, pageSize, CategoriaId, flagPublicado });
        return res.status(200).send(response);
    } catch (error) {
        controlError("listarTopPublicadoPorUsuario", error);
        res.status(500).send(buildContainer(false, error.message, null, null));
    }
}
async function listarTopItemByTop(req, res) {
    try {
        existeJsonData(req, res);

        let { TopId, createdBy, pageNumber, pageSize, flagPublicado } = req.body.data;
        let response = await controller.listarTopItemByTop({ TopId, createdBy, pageNumber, pageSize, flagPublicado });
        return res.status(200).send(response);
    } catch (error) {
        controlError("listarTopItemByTop", error);
        res.status(500).send(buildContainer(false, error.message, null, null));
    }
}
async function listarTopItemByLugar(req, res) {
    try {
        existeJsonData(req, res);

        let { lugarId } = req.body.data;
        let response = await controller.listarTopItemByLugar(lugarId);
        return res.status(200).send(response);
    } catch (error) {
        controlError("listarTopItemByLugar", error);
        res.status(500).send(buildContainer(false, error.message, null, null));
    }
}




async function listarTopByLugarByCategoria(req, res) {
    try {
        existeJsonData(req, res);
        const { LugarId, categoriaId } = req.body.data;
        let response = await controller.listarTopByLugarByCategoria(LugarId, categoriaId);
        return res.status(200).send(response);
    } catch (error) {
        controlError("listarTopByLugarByCategoria", error);
        res.status(500).send(buildContainer(false, error.message, null, null));
    }
}
async function getOneTop(req, res) {
    try {
        existeJsonData(req, res);
        const { id } = req.params;
        let createdBy = req.body.data.createdBy;
        let response = await controller.getOneTop(id, createdBy);
        return res.status(200).send(response);
    } catch (error) {
        controlError("listarTopGeneral", error);
        res.status(500).send(buildContainer(false, error.message, null, null));
    }

}
async function listarTopDetallePorTop(req, res) {
    try {
        const { id } = req.body.data;
        let response = await controller.listarTopDetallePorTop(id);
        return res.status(200).send(response);
    } catch (error) {
        controlError("listarTopDetallePorTop", error);
        res.status(500).send(buildContainer(false, error.message, null, null));
    }
}
async function eliminarTopDetalle(req, res) {
    try {
        const { id, modificadoPor } = req.body.data;
        let response = await controller.eliminarTopDetalle(id, modificadoPor);
        return res.status(200).send(response);
    } catch (error) {
        controlError("eliminarTopDetalle", error);
        res.status(500).send(buildContainer(false, error.message, null, null));
    }
}
async function listarTopPorUsuarioPorCategoria(req, res) {
    try {
        const { categoriaId, correoElectronico } = req.body.data;
        let response = await controller.listarTopPorUsuarioPorCategoria(categoriaId, correoElectronico);
        return res.status(200).send(response);
    } catch (error) {
        controlError("listarTopPorUsuarioPorCategoria", error);
        res.status(500).send(buildContainer(false, error.message, null, null));
    }
}
async function listarTopPorUsuarioPorFiltro(req, res) {
    try {
        const { filtro, correoElectronico } = req.body.data;
        let response = await controller.listarTopPorUsuarioPorFiltro(filtro, correoElectronico);
        return res.status(200).send(response);
    } catch (error) {
        controlError("listarTopPorUsuarioPorFiltro", error);
        res.status(500).send(buildContainer(false, error.message, null, null));
    }
}
async function listarTopGeneral(req, res) {
    try {
        const { categoriaId, cantidad } = req.body.data;
        let response = await controller.listarTopGeneral(categoriaId, cantidad);
        return res.status(200).send(response);
    } catch (error) {
        controlError("listarTopGeneral", error);
        res.status(500).send(buildContainer(false, error.message, null, null));
    }
}
module.exports = {
    createOrUpdateTop,
    listarTopPorUsuario,
    listarTopDetallePorTop,
    eliminarTopDetalle,
    eliminarTop,

    createOrUpdateTopItem,
    listarTopItemByLugar,

    listarTopPorUsuarioPorCategoria,
    listarTopPorUsuarioPorFiltro,
    publicarTop,
    listarTopGeneral,
    getOneTop,
    listarTopByLugarByCategoria,
    listarTopPublicadoPorUsuario,
    listarTopItemByTop
}
