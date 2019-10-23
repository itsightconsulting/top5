import usuarioController from '../controller/usuario.controller';
import { buildContainer, existeJsonData, controlError } from '../controller/common.controller';

async function crearUsuario(req, res) {
    try {
        existeJsonData(req, res);
        let response = await usuarioController.crearUsuario(req.body.data);
        return res.status(200).send(response);
    } catch (error) {
        controlError("crearUsuario", error);
        res.status(500).send(buildContainer(false, error.message, null, null));
    }
}
async function loginFacebook(req, res) {
    try {
        existeJsonData(req, res);
        let response = await usuarioController.loginFacebook(req.body.data);
        let statusCode = response.ok ? 200 : 401;
        res.status(statusCode).send(response);
    } catch (error) {
        controlError("loginFacebook", error);
        res.status(500).send(buildContainer(false, error.message, null, null));
    }
}
async function login(req, res) {
    try {
        existeJsonData(req, res);
        let { data } = req.body;
        let response = await usuarioController.login(data);
        if (response.ok) {
            res.status(200).send(response);
        } else {
            res.status(401).send(response);
        }
    } catch (error) {
        controlError("login", error);
        res.status(500).send(buildContainer(false, error.message, null, null));
    }
}

async function validarEmail(req, res) {
    try {
        existeJsonData(req, res);
        // let { data } = req.body;
        let { correoElectronico } = req.body.data;
        let response = await usuarioController.validarEmail(correoElectronico);
        res.status(200).send(response);
    } catch (error) {
        controlError("validarEmail", error);
        res.status(500).send(buildContainer(false, error.message, null, null));
    }
}

async function getOneUsuario(req, res) {
    try {
        const { id } = req.params;
        const response = await usuarioController.getOneUsuario(id);
        res.send(response);
    } catch (error) {
        controlError("getOneUsuario", error);
        res.status(500).send(buildContainer(false, error.message, null, null));
    }
}
async function uploadFile(req, res) {
    try {
        let files = req.files.image;
        let { id, path } = req.body;
        files = [].concat(files);
        let response = await usuarioController.uploadFile(id, path, files);
        res.status(200).send(response);
    } catch (error) {
        controlError("uploadFile", error);
        res.status(500).send(buildContainer(false, error.message, null, null));
    }
}
async function updateUsuario(req, res) {
    try {
        const { id } = req.params;
        existeJsonData(req, res);
        const { correoElectronico, nombreCompleto } = req.body.data;
        // let data = { id, correoElectronico: req.body.data.correoElectronico, nombreCompleto: req.body.data.nombreCompleto }
        // let files = [];
        // if (req.files) {
        //     files = [].concat(req.files.image);
        // }
        let response = await usuarioController.updateUsuario({ id, correoElectronico, nombreCompleto });
        res.status(200).send(response);
    } catch (error) {
        controlError("updateUsuario", error);
        res.status(500).send(buildContainer(false, error.message, null, null));
    }
}
async function downloadFile(req, res) {
    try {
        existeJsonData(req, res);
        const { id } = req.params;
        const { filePath } = req.body.data;
        let response = await usuarioController.downloadFile(id, filePath);
        res.status(200).send(response);
    } catch (error) {
        controlError("downloadFile", error);
        res.status(500).send(buildContainer(false, error.message, null, null));
    }
}
async function getTerminoyCondiciones(req, res) {
    try {
        let response = await usuarioController.getTerminoyCondiciones();
        res.status(200).send(response);
    } catch (error) {
        controlError("getTerminoyCondiciones", error);
        res.status(500).send(buildContainer(false, error.message, null, null));
    }
}
module.exports = {
    crearUsuario,
    loginFacebook,
    login,
    validarEmail,
    getOneUsuario,
    uploadFile,
    downloadFile,
    updateUsuario,
    getTerminoyCondiciones
}
