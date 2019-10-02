import authService from "../security/AuthService";
import models from '../database/database';
import util from '../utilitarios/utilitarios';
import { buildContainer, uploadToS3, downloadFromS3 } from './common.controller';
const bcrypt = require('bcrypt');
const saltRounds = 10;
const UsuarioDTO = models.Usuario;

function existeJsonData(req, res) {
    let { data } = req.body;
    if (!data) { return res.status(500).send(buildContainer(false, 'Cuerpo JSON "data" no esta definido.', null, null)); }
    // else return data;
}

async function validarEmail(CorreoElectronico) {
    try {
        const usuario = await UsuarioDTO.findOne({
            where: {
                CorreoElectronico: CorreoElectronico.toLowerCase(),
                FlagActivo: true
            }, attributes: ['CorreoElectronico']
        });
        let estadoExiste = usuario != null;
        return buildContainer(true, null, estadoExiste, null);
    } catch (error) {
        console.log("validarEmail (error): ", error);
        throw new Exception("controller validarEmail(error): " + error);
    }
}

async function login(data) {
    try {
        let usuario = await UsuarioDTO.findOne({
            where: {
                CorreoElectronico: data.CorreoElectronico.toLowerCase(),
                TipoUsuarioId: data.TipoUsuarioId
            }, attributes: ['UsuarioId', 'Contrasenia', 'NombreCompleto', 'FechaCreacion', 'RutaImagenPerfil']
        });
        if (usuario === null) {
            return buildContainer(false, 'Email no existe.', null, null);
        }
        var passwordIsValid = bcrypt.compareSync(data.Contrasenia, usuario.Contrasenia);
        if (!passwordIsValid) return buildContainer(false, 'Contraseña incorrecto.', null, null);

        let objToken = ObjectToken(usuario);
        let token = await authService.generateToken(objToken);
        objToken.NombreCompleto = usuario.NombreCompleto;
        return buildContainer(true, '', objToken, token);
    } catch (error) {
        console.log("login error:", error);
        throw error;
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

async function crearUsuario(data) {
    try {
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
            return buildContainer(true, 'Usuario creado correctamente.', null, token);
        } else {
            throw new Exception('No se pudo crear usuario');
        }
    } catch (error) {
        console.log("controller crearUsuario(error):", error);
        throw error;
    }
}

async function loginFacebook(data) {
    try {
        let { CorreoElectronico, TipoUsuarioId, RutaImagenPerfil } = data;

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
                return buildContainer(false, 'Email ya existe', null, null);
            }
        } else {
            let newUsuario = await UsuarioDTO.create({
                CorreoElectronico
                , TipoUsuarioId
                , FlagActivo: true
                , FlagEliminado: false
                , FechaCreacion: util.get_Date()
                , RutaImagenPerfil
            }, { fields: ['CorreoElectronico', 'TipoUsuarioId', 'FlagActivo', 'FlagEliminado', 'FechaCreacion', 'RutaImagenPerfil'] });
            if (newUsuario) {
                objToken = ObjectToken({ CorreoElectronico: newUsuario.CorreoElectronico, UsuarioId: newUsuario.UsuarioId });
            }
        }

        if (!objToken) throw new Exception('objToken no se ha creado correctamente');
        let token = await authService.generateToken(objToken);
        return buildContainer(true, '', objToken, token);
    } catch (error) {
        console.log("controller loginFacebook(error):", error);
        throw error;
    }
}
async function getOneUsuario(id) {
    try {
        const usuario = await UsuarioDTO.findOne({
            where: {
                UsuarioId: id
            }
        });
        return buildContainer(true, '', usuario, null);
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
async function updateRutaImagenPerfil(id, ruta) {
    try {
        const usuario = await UsuarioDTO.findOne({
            attributes: ['UsuarioId', 'RutaImagenPerfil']
            , where: {
                UsuarioId: id
            }
        });

        if (usuario === null) throw new Exception('Usuario no existe');

        await usuario.update({
            RutaImagenPerfil: ruta
        });

        return usuario;
    } catch (error) {
        console.log('updateRutaImagenPerfil (error): ', error);
        throw error
    }

}
async function uploadFile(id, path, files) {
    try {
        let bucketName = "itsight-top5-bucket-user";
        console.log('files cant', files.length);
        let rutaImagenPerfil = '';
        files.forEach(async file => {
            const { name, size, mimetype } = file;
            let key = `user/${id}/${path}/${name}`;
            const { Location } = await uploadToS3(file, bucketName, key);
            rutaImagenPerfil = await updateRutaImagenPerfil(id, Location);
        });
        return buildContainer(true, '', rutaImagenPerfil, null)
    } catch (error) {
        console.log("uploadFile error:", error);
        throw error;
    }
}

async function downloadFile(id, filePath) {
    try {
        let bucketName = "itsight-top5-bucket-user";
        let key = `user/${id}/${filePath}`;
        console.log("key", key);
        let data = await downloadFromS3(bucketName, key);
        return buildContainer(true, 'Descarga de archivo concluido', data, null);
    } catch (error) {
        console.log("uploadFile error:", error);
        throw error;
    }
}

module.exports = {
    login
    , crearUsuario
    , getOneUsuario
    , validarEmail
    , loginFacebook
    , uploadFile
    , downloadFile
}