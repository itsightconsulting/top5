import controller from '../controller/top.controller';
import { buildContainer, existeJsonData } from '../controller/common.controller';

async function crearTop(req, res) {
    try {
        existeJsonData(req, res);
        const { objTop, objTopDetalle } = req.body.data;
        let response = await controller.crearTop(objTop, objTopDetalle);
        return res.status(200).send(response);
    } catch (err) {
        console.log("crearTop.routes error:", err.message);
        res.status(500).send(buildContainer(false, 'Sucedio un error inesperado vuelva a intentar.', null, null));
    }
}

async function listarTopPorUsuario(req, res) {
    try {
        const { correoElectronico, cantidad } = req.body.data;
        let response = await controller.listarTopPorUsuario(correoElectronico, cantidad);
        return res.status(200).send(response);
    } catch (err) {
        console.log("listarCategoria.routes error:", err.message);
        res.status(500).send(buildContainer(false, 'Sucedio un error inesperado vuelva a intentar.', null, null));
    }
}

async function listarTopDetallePorTop(req, res) {
    try {
        const { id } = req.body.data;
        let response = await controller.listarTopDetallePorTop(id);
        return res.status(200).send(response);
    } catch (err) {
        console.log("listarCategoria.routes error:", err.message);
        res.status(500).send(buildContainer(false, 'Sucedio un error inesperado vuelva a intentar.', null, null));
    }
}

async function eliminarTopDetalle(req, res) {
    try {
        const { id, modificadoPor } = req.body.data;
        let response = await controller.eliminarTopDetalle(id, modificadoPor);
        return res.status(200).send(response);
    } catch (err) {
        console.log("listarCategoria.routes error:", err.message);
        res.status(500).send(buildContainer(false, 'Sucedio un error inesperado vuelva a intentar.', null, null));
    }
}

async function eliminarTop(req, res) {
    try {
        const { id, modificadoPor } = req.body.data;
        let response = await controller.eliminarTop(id, modificadoPor);
        return res.status(200).send(response);
    } catch (err) {
        console.log("listarCategoria.routes error:", err.message);
        res.status(500).send(buildContainer(false, 'Sucedio un error inesperado vuelva a intentar.', null, null));
    }
}

async function listarTopPorUsuarioPorCategoria(req, res) {
    try {
        const { categoriaId, correoElectronico } = req.body.data;
        let response = await controller.listarTopPorUsuarioPorCategoria(categoriaId, correoElectronico);
        return res.status(200).send(response);
    } catch (err) {
        console.log("listarCategoria.routes error:", err.message);
        res.status(500).send(buildContainer(false, 'Sucedio un error inesperado vuelva a intentar.', null, null));
    }
}

async function listarTopPorUsuarioPorFiltro(req, res) {
    try {
        const { filtro, correoElectronico } = req.body.data;
        let response = await controller.listarTopPorUsuarioPorFiltro(filtro, correoElectronico);
        return res.status(200).send(response);
    } catch (err) {
        console.log("listarCategoria.routes error:", err.message);
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
    listarTopPorUsuarioPorFiltro
}
