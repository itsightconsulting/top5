import controller from '../controller/top.controller';
import { buildContainer, existeJsonData, controlError } from '../controller/common.controller';

async function crearTop(req, res) {
    try {
        existeJsonData(req, res);
        const { top, topDetalle } = req.body.data;
        let response = await controller.crearTop(top, topDetalle);
        return res.status(200).send(response);
    } catch (error) {
        controlError("crearTop", error);
        res.status(500).send(buildContainer(false, 'Sucedio un error inesperado vuelva a intentar.', null, null));
    }
}

async function listarTopPorUsuario(req, res) {
    try {
        existeJsonData(req, res);
        const { correoElectronico, cantidad } = req.body.data;
        let response = await controller.listarTopPorUsuario(correoElectronico, cantidad);
        return res.status(200).send(response);
    } catch (error) {
        controlError("listarTopPorUsuario", error);
        res.status(500).send(buildContainer(false, 'Sucedio un error inesperado vuelva a intentar.', null, null));
    }
}

async function listarTopDetallePorTop(req, res) {
    try {
        const { id } = req.body.data;
        let response = await controller.listarTopDetallePorTop(id);
        return res.status(200).send(response);
    } catch (error) {
        controlError("listarTopDetallePorTop", error);
        res.status(500).send(buildContainer(false, 'Sucedio un error inesperado vuelva a intentar.', null, null));
    }
}

async function eliminarTopDetalle(req, res) {
    try {
        const { id, modificadoPor } = req.body.data;
        let response = await controller.eliminarTopDetalle(id, modificadoPor);
        return res.status(200).send(response);
    } catch (error) {
        controlError("eliminarTopDetalle", error);
        res.status(500).send(buildContainer(false, 'Sucedio un error inesperado vuelva a intentar.', null, null));
    }
}

async function eliminarTop(req, res) {
    try {
        const { id, modificadoPor } = req.body.data;
        let response = await controller.eliminarTop(id, modificadoPor);
        return res.status(200).send(response);
    } catch (error) {
        controlError("eliminarTop", error);
        res.status(500).send(buildContainer(false, 'Sucedio un error inesperado vuelva a intentar.', null, null));
    }
}

async function listarTopPorUsuarioPorCategoria(req, res) {
    try {
        const { categoriaId, correoElectronico } = req.body.data;
        let response = await controller.listarTopPorUsuarioPorCategoria(categoriaId, correoElectronico);
        return res.status(200).send(response);
    } catch (error) {
        controlError("listarTopPorUsuarioPorCategoria", error);
        res.status(500).send(buildContainer(false, 'Sucedio un error inesperado vuelva a intentar.', null, null));
    }
}

async function listarTopPorUsuarioPorFiltro(req, res) {
    try {
        const { filtro, correoElectronico } = req.body.data;
        let response = await controller.listarTopPorUsuarioPorFiltro(filtro, correoElectronico);
        return res.status(200).send(response);
    } catch (error) {
        controlError("listarTopPorUsuarioPorFiltro", error);
        res.status(500).send(buildContainer(false, 'Sucedio un error inesperado vuelva a intentar.', null, null));
    }
}
async function publicarTop(req, res) {
    try {
        const { id, modificadoPor } = req.body.data;
        let response = await controller.publicarTop(id);
        return res.status(200).send(response);
    } catch (error) {
        controlError("publicarTop", error);
        res.status(500).send(buildContainer(false, 'Sucedio un error inesperado vuelva a intentar.', null, null));
    }
}
async function listarTopGeneral(req, res) {
    try {
        const { categoriaId, cantidad } = req.body.data;
        let response = await controller.listarTopGeneral(categoriaId, cantidad);
        return res.status(200).send(response);
    } catch (error) {
        controlError("listarTopGeneral", error);
        res.status(500).send(buildContainer(false, 'Sucedio un error inesperado vuelva a intentar.', null, null));
    }
}
async function getOneTop(req, res) {
    try {
        const { id } = req.params;
        let response = await controller.getOneTop(id);
        return res.status(200).send(response);
    } catch (error) {
        controlError("listarTopGeneral", error);
        res.status(500).send(buildContainer(false, 'Sucedio un error inesperado vuelva a intentar.', null, null));
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
    publicarTop,
    listarTopGeneral,
    getOneTop
}
