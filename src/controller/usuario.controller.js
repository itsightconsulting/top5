import authService from "../security/AuthService";
import models from '../database/database';
import util from '../utilitarios/utilitarios';
import { buildContainer, uploadToS3, downloadFromS3 } from './common.controller';
const bcrypt = require('bcrypt');
const saltRounds = 10;
const UsuarioDTO = models.Usuario;

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
        throw new Error("controller validarEmail(error): " + error);
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
        usuario.Contrasenia = '';
        return buildContainer(true, '', usuario, token);
    } catch (error) {
        console.log("login error:", error);
        throw error;
    }
}
function ObjectToken(usuario) {
    return {
        email: usuario.CorreoElectronico
        , id: usuario.UsuarioId
    }
}

async function crearUsuario(data) {
    try {
        let { NombreCompleto, CorreoElectronico, Contrasenia, TipoUsuarioId } = data;

        let salt = await bcrypt.genSalt(saltRounds);
        let ContraseniaEncrypt = await bcrypt.hash(Contrasenia, salt);
        CorreoElectronico = CorreoElectronico.toLowerCase();
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
            throw new Error('No se pudo crear usuario');
        }
    } catch (error) {
        console.log("controller crearUsuario(error):", error);
        throw error;
    }
}

async function loginFacebook(data) {
    try {
        let { CorreoElectronico, TipoUsuarioId, RutaImagenPerfil } = data;

        let usuario = await UsuarioDTO.findOne({
            where: {
                CorreoElectronico: CorreoElectronico,
                FlagActivo: true
            }, attributes: ['CorreoElectronico', 'UsuarioId', 'TipoUsuarioId', 'RutaImagenPerfil']
        });
        // usuario = usuario || null;
        let objToken = {};
        if (usuario != null) {
            let flagExisteTipoUsuario = TipoUsuarioId === usuario.TipoUsuarioId;
            if (flagExisteTipoUsuario) {
                // updateRutaImagen
                let flagCambiarRuta = usuario.RutaImagenPerfil !== RutaImagenPerfil;
                if (flagCambiarRuta) {
                    await updateRutaImagenPerfil(usuario.UsuarioId, RutaImagenPerfil);
                }
                objToken = ObjectToken({ CorreoElectronico: usuario.CorreoElectronico, UsuarioId: usuario.UsuarioId });
            } else {
                return buildContainer(false, 'Email ya se encuentra registrado', null, null);
            }
        } else {
            CorreoElectronico = CorreoElectronico.toLower();
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
            usuario = newUsuario;
        }

        if (!objToken) throw new Error('objToken no se ha creado correctamente');
        let token = await authService.generateToken(objToken);
        return buildContainer(true, '', usuario, token);
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
        usuario.Contrasenia = '';
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
            CorreoElectronico, Contrasenia
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

        if (usuario === null) throw new Error('Usuario no existe');

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