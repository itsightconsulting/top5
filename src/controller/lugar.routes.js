import controller from '../controller/lugar.controller';
import { buildContainer, existeJsonData, controlError } from '../controller/common.controller';

async function createdOrUpdatedLugar(req, res) {
    try {
        existeJsonData(req, res);
        let response = await controller.createdOrUpdatedLugar(req.body.data);
        return res.status(200).send(response);
    } catch (error) {
        controlError("crearLugar", error);
        res.status(500).send(buildContainer(false, 'Sucedio un error inesperado vuelva a intentar.', null, null));
    }
}


async function obtenerLugar(req, res) {
    try {
        existeJsonData(req, res);
        const { id } = req.params;
        const { createdBy } = req.body.data;
        let response = await controller.obtenerLugar(id, createdBy);
        return res.status(200).send(response);
    } catch (error) {
        controlError("obtenerLugar", error);
        res.status(500).send(buildContainer(false, error.message, null, null));
    }
}
async function listarLugares(req, res) {
    try {
        existeJsonData(req, res);
        let response = await controller.listarLugares(req.body.data.createdBy);
        return res.status(200).send(response);
    } catch (error) {
        controlError("listarLugares", error);
        res.status(500).send(buildContainer(false, error.message, null, null));
    }
}
async function eliminarLugar(req, res) {
    try {
        existeJsonData(req, res);
        // const { id } = req.params;
        const { id, modificadoPor } = req.body.data;
        let response = await controller.eliminarLugar(id, modificadoPor);
        return res.status(200).send(response);
    } catch (error) {
        controlError("eliminarLugar", error);
        res.status(500).send(buildContainer(false, 'Sucedio un error inesperado vuelva a intentar.', null, null));
    }
}

module.exports = {
    createdOrUpdatedLugar,

    obtenerLugar,
    listarLugares,
    eliminarLugar
}