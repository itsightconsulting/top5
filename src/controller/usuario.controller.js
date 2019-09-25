import authService from "../security/AuthService";
import models from '../database/database';
import util from '../utilitarios/utilitarios';
import { uploadToS3, downloadFromS3 } from './common.controller';
const bcrypt = require('bcrypt');
const saltRounds = 10;
const UsuarioDTO = models.Usuario;

function existeJsonData(req, res) {
    let { data } = req.body;
    if (!data) { return res.status(500).send(buildContainer(false, 'Cuerpo JSON "data" no esta definido.', null, null)); }
    // else return data;
}

async function validarEmail(req, res) {
    try {
        existeJsonData(req, res);
        let { data } = req.body;
        console.log("data", req.body.data);
        let { CorreoElectronico } = data;
        const usuario = await UsuarioDTO.findOne({
            where: {
                CorreoElectronico: CorreoElectronico.toLowerCase(),
                FlagActivo: true
            }, attributes: ['CorreoElectronico']
        });
        let estadoExiste = usuario != null;
        res.status(200).send(buildContainer(true, null, estadoExiste, null));
    } catch (err) {
        console.log("validarEmail error: ", err);
        res.status(500).send(buildContainer(false, 'Sucedio un error inesperado vuelva a intentar.', null, null));
    }
}

async function login(req, res) {
    try {
        existeJsonData(req, res);
        let { data } = req.body;
        let { CorreoElectronico, Contrasenia, FechaCreacion, TipoUsuarioId } = data;
        let usuario = await UsuarioDTO.findOne({
            where: {
                CorreoElectronico: CorreoElectronico.toLowerCase(),
                TipoUsuarioId: TipoUsuarioId
            }, attributes: ['UsuarioId', 'Contrasenia', 'NombreCompleto', 'FechaCreacion']
        });
        if (usuario === null) {
            return res.status(401).send(buildContainer(false, 'Email no existe.', null, null));
        }
        var passwordIsValid = bcrypt.compareSync(Contrasenia, usuario.Contrasenia);
        if (!passwordIsValid) return res.status(401).send(buildContainer(false, 'Contraseña incorrecto.', null, null));

        let objToken = ObjectToken(usuario);
        let token = await authService.generateToken(objToken);
        objToken.NombreCompleto = usuario.NombreCompleto;
        res.status(200).send(buildContainer(true, '', objToken, token));
    } catch (err) {
        console.log("login error:", err);
        res.status(500).send(buildContainer(false, 'Sucedio un error inesperado vuelva a intentar.', null, null));
    }
}
function cerrarSession() {
    res.status(200).send(buildContainer(true, 'Correcto.', null, null));
}

function ObjectToken(usuario) {
    return {
        email: usuario.CorreoElectronico
        , id: usuario.UsuarioId
    }
}
async function relogin(req, res) {
    try {
        const { id, data, token } = req.body;
        let oldToken = await authService.obtenerTokenDecoded(token);
        let newToken = await authService.generateToken(oldToken);

        var rpta = await UsuarioDTO.findOne({ where: { usuarioId: oldToken.UsuarioId, FlagActivo: true } });
        if (rpta === null)
            res.send({ ok: false, message: "No existe el usuario" });
        else
            res.send({ ok: true, data: rpta, token: newToken });

    } catch (err) {
        console.log("relogin error:", err);
        res.status(500).send(buildContainer(false, 'Sucedio un error inesperado vuelva a intentar.', null, null));
    }
}

async function crearUsuario(req, res) {
    try {
        existeJsonData(req, res);
        let { data } = req.body;
        let { NombreCompleto, CorreoElectronico, Contrasenia, TipoUsuarioId } = data;

        let salt = await bcrypt.genSalt(saltRounds);
        let ContraseniaEncrypt = await bcrypt.hash(Contrasenia, salt);
        let newUsuario = await UsuarioDTO.create({
            NombreCompleto
            , CorreoElectronico
            , Contrasenia: ContraseniaEncrypt
            , TipoUsuarioId
            , FlagActivo: true
            , FlagEliminado: false
            , FechaCreacion: util.get_Date()
        }, {
            fields: ['NombreCompleto', 'CorreoElectronico', 'Contrasenia', 'TipoUsuarioId', 'FlagActivo', 'FlagEliminado', 'FechaCreacion']
        });
        if (newUsuario) {
            let objToken = ObjectToken({ CorreoElectronico: newUsuario.CorreoElectronico, UsuarioId: newUsuario.UsuarioId });
            let token = await authService.generateToken(objToken);
            res.send(buildContainer(true, 'Usuario creado correctamente.', null, token));
        }
    } catch (err) {
        console.log("crearUsuario error:", err);
        res.status(500).send(buildContainer(false, 'Sucedio un error inesperado vuelva a intentar.', null, null));
    }
}

async function loginFacebook(req, res) {
    try {
        existeJsonData(req, res);
        let { data } = req.body;
        let { CorreoElectronico, TipoUsuarioId } = data;

        const usuario = await UsuarioDTO.findOne({
            where: {
                CorreoElectronico: CorreoElectronico.toLowerCase(),
                FlagActivo: true
            }, attributes: ['CorreoElectronico', 'UsuarioId', 'TipoUsuarioId']
        });
        usuario = usuario || null;
        let objToken = {};
        if (usuario != null) {
            let flagExisteTipoUsuario = TipoUsuarioId == usuario.TipoUsuarioId;
            if (flagExisteTipoUsuario) {
                objToken = ObjectToken({ CorreoElectronico: usuario.CorreoElectronico, UsuarioId: usuario.UsuarioId });
            } else {
                return res.status(401).send(buildContainer(false, 'Email ya existe', null, null));
            }
        } else {
            let newUsuario = await UsuarioDTO.create({
                CorreoElectronico
                , TipoUsuarioId
                , FlagActivo: true
                , FlagEliminado: false
                , FechaCreacion: util.get_Date()
            }, { fields: ['CorreoElectronico', 'TipoUsuarioId', 'FlagActivo', 'FlagEliminado', 'FechaCreacion'] });
            if (newUsuario) {
                objToken = ObjectToken({ CorreoElectronico: newUsuario.CorreoElectronico, UsuarioId: newUsuario.UsuarioId });
            }
        }
        let token = await authService.generateToken(objToken);
        res.status(200).send(buildContainer(true, '', objToken, token));
    } catch (err) {
        console.log("crearUsuario error:", err);
        res.status(500).send(buildContainer(false, 'Sucedio un error inesperado vuelva a intentar.', null, null));
    }
}

function buildContainer(ok, message, data, token) {
    let dataJSON = {
        ok,
        message,
        data,
        token
    }
    return dataJSON;
}

async function getOneUsuario(req, res) {
    try {
        const { id } = req.params;

        const usuario = await UsuarioDTO.findOne({
            where: {
                UsuarioId: id
            }
        });
        res.send(buildContainer(true, '', usuario, null));
    } catch (err) {
        console.log("getOneUsuario error: ", err);
        res.status(500).send(buildContainer(false, 'Sucedio un error inesperado vuelva a intentar.', null, null));
    }
}

async function updateUsuario(req, res) {
    const { id } = req.params;
    const { CorreoElectronico, Contrasenia } = req.body;

    const usuario = await UsuarioDTO.findOne({
        attributes: ['CorreoElectronico', 'Contrasenia']
        , where: {
            UsuarioId: id
        }
    });

    const salt = await bcrypt.genSalt(saltRounds);
    Contrasenia = await bcrypt.hash(Contrasenia, salt);

    if (usuario != null && usuario != undefined) {
        await usuario.update({
            Nombres, Apellidos, CorreoElectronico, Username, Contrasenia
        });
    }
    return res.send({
        message: 'Actualizado correctamente.',
        data: usuario
    })
}

async function uploadFile(req, res) {
    try {
        const { id } = req.params;
        let bucketName = "itsight-top5-bucket-user";
        let files = req.files.image;
        let { path } = req.body;
        console.log(path);
        files.forEach(async file => {
            const { name, size, mimetype } = file;
            let key = `user/${id}/${path}/${name}`;
            await uploadToS3(file, bucketName, key);
        });
        res.status(200).send(buildContainer(true, 'Carga de archivo concluido', null, null));
    } catch (err) {
        console.log("uploadFile error:", err);
        res.status(500).send(buildContainer(false, 'Sucedio un error inesperado vuelva a intentar.', null, null));
    }
}

async function downloadFile(req, res) {
    try {
        existeJsonData(req, res);
        const { id } = req.params;
        let { filePath } = req.body.data;
        // https://itsight-top5-bucket-user.s3.us-east-2.amazonaws.com/user/1/photo-profile/material_foto.jpg
        let bucketName = "itsight-top5-bucket-user";
        let key = `user/${id}/${filePath}`;
        console.log(key);
        let data = await downloadFromS3(bucketName, key);
        res.status(200).send(buildContainer(true, 'Carga de archivo concluido', data, null));
    } catch (err) {
        console.log("uploadFile error:", err);
        res.status(500).send(buildContainer(false, 'Sucedio un error inesperado vuelva a intentar.', null, null));
    }
}

module.exports = {
    login
    , relogin
    , crearUsuario
    , getOneUsuario
    , updateUsuario
    , cerrarSession
    , validarEmail
    , loginFacebook
    , uploadFile
    , downloadFile
}