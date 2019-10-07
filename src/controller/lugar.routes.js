import controller from '../controller/lugar.controller';
import { buildContainer, existeJsonData } from '../controller/common.controller';

async function crearLugar(req, res) {
    try {
        existeJsonData(req, res);
        let response = await controller.crearLugar(req.body.data);
        return res.status(200).send(response);
    } catch (err) {
        console.log("crearLugar.routes error:", err.message);
        res.status(500).send(buildContainer(false, 'Sucedio un error inesperado vuelva a intentar.', null, null));
    }
}
async function obtenerLugar(req, res) {
    try {
        existeJsonData(req, res);
        // const { id } = req.params;
        const { id } = req.body.data;
        let response = await controller.obtenerLugar(id);
        return res.status(200).send(response);
    } catch (err) {
        console.log("obtenerLugar.routes error:", err.message);
        res.status(500).send(buildContainer(false, 'Sucedio un error inesperado vuelva a intentar.', null, null));
    }
}
async function eliminarLugar(req, res) {
    try {
        existeJsonData(req, res);
        // const { id } = req.params;
        const { id, modificadoPor } = req.body.data;
        let response = await controller.eliminarLugar(id, modificadoPor);
        return res.status(200).send(response);
    } catch (err) {
        console.log("eliminarLugar.routes error:", err.message);
        res.status(500).send(buildContainer(false, 'Sucedio un error inesperado vuelva a intentar.', null, null));
    }
}
async function obtenerLugarPorUbicacion(req, res) {
    try {
        existeJsonData(req, res);
        const { Latitud, Longitud } = req.body.data;
        let response = await controller.obtenerLugarPorUbicacion(Latitud, Longitud);
        return res.status(200).send(response);
    } catch (err) {
        console.log("obtenerLugarPorUbicacion.routes error:", err.message);
        res.status(500).send(buildContainer(false, 'Sucedio un error inesperado vuelva a intentar.', null, null));
    }
}
async function listarLugares(req, res) {
    try {
        let response = await controller.listarLugares();
        return res.status(200).send(response);
    } catch (err) {
        console.log("listarLugares.routes error:", err.message);
        res.status(500).send(buildContainer(false, 'Sucedio un error inesperado vuelva a intentar.', null, null));
    }
}

module.exports = {
    crearLugar,
    obtenerLugar,
    eliminarLugar,
    obtenerLugarPorUbicacion,
    listarLugares
}