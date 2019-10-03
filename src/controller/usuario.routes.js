import usuarioController from '../controller/usuario.controller';
import { buildContainer } from '../controller/common.controller';

async function crearUsuario(req, res) {
    try {
        existeJsonData(req, res);
        let response = await usuarioController.crearUsuario(req.body.data);
        return res.status(200).send(response);
    } catch (err) {
        console.log("crearUsuario error:", err.message);
        res.status(500).send(buildContainer(false, 'Sucedio un error inesperado vuelva a intentar.', null, null));
    }
}
async function loginFacebook(req, res) {
    try {
        existeJsonData(req, res);
        let response = await usuarioController.loginFacebook(req.body.data);
        let statusCode = response.ok ? 200 : 401;
        res.status(statusCode).send(response);
    } catch (err) {
        console.log("crearUsuario error:", err);
        res.status(500).send(buildContainer(false, 'Sucedio un error inesperado vuelva a intentar.', null, null));
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
    } catch (err) {
        console.log("login error:", err);
        res.status(500).send(buildContainer(false, 'Sucedio un error inesperado vuelva a intentar.', null, null));
    }
}

async function validarEmail(req, res) {
    try {
        existeJsonData(req, res);
        // let { data } = req.body;
        let { CorreoElectronico } = req.body.data;
        let response = await usuarioController.validarEmail(CorreoElectronico);
        res.status(200).send(response);
    } catch (error) {
        console.log("validarEmail (error): ", error);
        res.status(500).send(buildContainer(false, 'Sucedio un error inesperado vuelva a intentar.', error, null));
    }
}

async function getOneUsuario(req, res) {
    try {
        const { id } = req.params;
        const response = await usuarioController.getOneUsuario(id);
        res.send(response);
    } catch (err) {
        console.log("getOneUsuario error: ", err);
        res.status(500).send(buildContainer(false, 'Sucedio un error inesperado vuelva a intentar.', null, null));
    }
}
async function uploadFile(req, res) {
    try {
        let files = req.files.image;
        let { id, path } = req.body;
        files = [].concat(files);
        let response = await usuarioController.uploadFile(id, path, files);
        res.status(200).send(response);
    } catch (err) {
        console.log("uploadFile error:", err);
        res.status(500).send(buildContainer(false, 'Sucedio un error inesperado vuelva a intentar.', err, null));
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
        console.log("downloadFile (error): ", error);
        res.status(500).send(buildContainer(false, 'Sucedio un error inesperado vuelva a intentar.', error, null));
    }
}
function existeJsonData(req, res) {
    let { data } = req.body;
    if (!data) {
        throw new Error('Cuerpo JSON "data" no esta definido.');
    }
}
module.exports = {
    crearUsuario,
    loginFacebook,
    login,
    validarEmail,
    getOneUsuario,
    uploadFile,
    downloadFile
}
