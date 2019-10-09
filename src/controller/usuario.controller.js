import models from '../orm.database/models/index';
import authService from "../security/AuthService";

import util from '../utilitarios/utilitarios';
import { TERMINOS_Y_CONDICIONES, AVISO_POLITICA_Y_PRIVACIDAD } from '../utilitarios/constants';
import { buildContainer, uploadToS3, downloadFromS3 } from './common.controller';
import { obtenerParametro } from '../controller/parametro.controller';
const bcrypt = require('bcrypt');
const saltRounds = 10;
const UsuarioDTO = models.Usuario;

async function validarEmail(correoElectronico) {
    try {
        const usuario = await UsuarioDTO.findOne({
            where: {
                correoElectronico: correoElectronico.toLowerCase(),
                flagActive: true
            }, attributes: ['correoElectronico']
        });
        let estadoExiste = usuario != null;
        return buildContainer(true, null, estadoExiste, null);
    } catch (error) {
        throw error;
        // util.controlError("validarEmail", error);
        // throw new Error("controller validarEmail(error): " + error);
    }
}

async function login(data) {
    try {
        let usuario = await UsuarioDTO.findOne({
            where: {
                correoElectronico: data.correoElectronico.toLowerCase(),
                TipoUsuarioId: data.TipoUsuarioId
            }, attributes: ['id', 'contrasenia', 'nombreCompleto', 'createdAt', 'rutaImagenPerfil']
        });
        if (usuario === null) {
            return buildContainer(false, 'Email no existe.', null, null);
        }
        var passwordIsValid = bcrypt.compareSync(data.contrasenia, usuario.contrasenia);
        if (!passwordIsValid) return buildContainer(false, 'Contraseña incorrecto.', null, null);

        let objToken = ObjectToken(usuario);
        let token = await authService.generateToken(objToken);
        usuario.contrasenia = '';
        return buildContainer(true, '', usuario, token);
    } catch (error) {
        // console.log("login error:", error);
        throw error;
    }
}
function ObjectToken(usuario) {
    return {
        email: usuario.correoElectronico
        , id: usuario.id
    }
}

async function crearUsuario(data) {
    try {
        let { nombreCompleto, correoElectronico, contrasenia, TipoUsuarioId } = data;

        let salt = await bcrypt.genSalt(saltRounds);
        let contraseniaEncrypt = await bcrypt.hash(contrasenia, salt);
        correoElectronico = correoElectronico.toLowerCase();
        let newUsuario = await UsuarioDTO.create({
            nombreCompleto
            , contrasenia: contraseniaEncrypt
            , correoElectronico
            , TipoUsuarioId
            , flagActive: true
            , flagEliminate: false
            , createdAt: util.get_Date()
            , updatedAt: util.get_Date()
        }, {
            fields: ['nombreCompleto', 'correoElectronico', 'contrasenia', 'TipoUsuarioId', 'flagActive', 'flagEliminate', 'createdAt', 'updatedAt']
        });
        if (newUsuario) {
            let objToken = ObjectToken({ correoElectronico: newUsuario.correoElectronico, id: newUsuario.id });
            let token = await authService.generateToken(objToken);
            return buildContainer(true, 'Usuario creado correctamente.', null, token);
        } else {
            throw new Error('No se pudo crear usuario');
        }
    } catch (error) {
        // util.controlError("crearUsuario", error);
        throw error;
    }
}

async function loginFacebook(data) {
    try {
        let { correoElectronico, TipoUsuarioId, rutaImagenPerfil } = data;

        let usuario = await UsuarioDTO.findOne({
            where: {
                correoElectronico: correoElectronico,
                flagActive: true
            }, attributes: ['correoElectronico', 'id', 'TipoUsuarioId', 'rutaImagenPerfil']
        });
        // usuario = usuario || null;
        let objToken = {};
        if (usuario != null) {
            let flagExisteTipoUsuario = TipoUsuarioId === usuario.TipoUsuarioId;
            if (flagExisteTipoUsuario) {
                // updateRutaImagen
                let flagCambiarRuta = usuario.rutaImagenPerfil !== rutaImagenPerfil;
                if (flagCambiarRuta) {
                    console.log("flagCambiarRuta", flagCambiarRuta);
                    await updaterutaImagenPerfil(usuario.id, rutaImagenPerfil);
                }
                objToken = ObjectToken({ correoElectronico: usuario.correoElectronico, id: usuario.id });
            } else {
                return buildContainer(false, 'Email ya se encuentra registrado', null, null);
            }
        } else {
            correoElectronico = correoElectronico.toLower();
            let newUsuario = await UsuarioDTO.create({
                correoElectronico
                , TipoUsuarioId
                , flagActive: true
                , flagEliminate: false
                , createdAt: util.get_Date()
                , updatedAt: util.get_Date()
                , rutaImagenPerfil
            }, { fields: ['correoElectronico', 'TipoUsuarioId', 'flagActive', 'flagEliminate', 'createdAt', 'updatedAt', 'rutaImagenPerfil'] });
            if (newUsuario) {
                objToken = ObjectToken({ correoElectronico: newUsuario.correoElectronico, id: newUsuario.id });
            }
            usuario = newUsuario;
        }

        if (!objToken) throw new Error('objToken no se ha creado correctamente');
        let token = await authService.generateToken(objToken);
        return buildContainer(true, '', usuario, token);
    } catch (error) {
        // util.controlError("loginFacebook", error);
        throw error;
    }
}
async function getOneUsuario(id) {
    try {
        const usuario = await UsuarioDTO.findOne({
            where: {
                id
            }
        });
        usuario.contrasenia = '';
        return buildContainer(true, '', usuario, null);
    } catch (err) {
        console.log("getOneUsuario error: ", err);
        res.status(500).send(buildContainer(false, 'Sucedio un error inesperado vuelva a intentar.', null, null));
    }
}
async function updateUsuario(data, path, files) {
    try {
        const { id, correoElectronico, nombreCompleto } = data;
        if (!id || !correoElectronico || !nombreCompleto) {
            throw new Error("No puede enviar data vacio");
        }
        if (files) {
            console.log("files", files.length);
            await uploadFile(id, path, files);
        }

        await UsuarioDTO.update({
            nombreCompleto
            , correoElectronico
            , updatedAt: util.get_Date()
        }, {
            where: {
                id
            }
        });

        return buildContainer(true, 'Actualizado correctamente.', null, null);
    } catch (error) {
        throw error;
    }
}
async function getTerminoyCondiciones() {
    try {
        let terminosyC = await obtenerParametro(TERMINOS_Y_CONDICIONES);
        let avisoPyP = await obtenerParametro(AVISO_POLITICA_Y_PRIVACIDAD);
        if (!terminosyC || !avisoPyP) throw new Error(`parámetro ${TERMINOS_Y_CONDICIONES} y/ó ${AVISO_POLITICA_Y_PRIVACIDAD} no existen`);
        let data = { terminosyC: terminosyC.value, avisoPyP: avisoPyP.value };
        return buildContainer(true, '', data, null);
    } catch (error) {
        throw error;
    }
}
async function updaterutaImagenPerfil(id, ruta) {
    try {
        const usuario = await UsuarioDTO.findOne({
            attributes: ['id', 'rutaImagenPerfil']
            , where: {
                id
            }
        });

        if (usuario === null) throw new Error('Usuario no existe');

        await usuario.update({
            rutaImagenPerfil: ruta
        });

        return usuario;
    } catch (error) {
        // util.controlError("updaterutaImagenPerfil", error);
        throw error
    }

}
async function uploadFile(id, path, files) {
    try {
        let bucketName = "itsight-top5-bucket-user";
        if (files) {
            console.log('files cant', files.length);
            let rutaImagenPerfil = '';
            files.forEach(async file => {
                const { name, size, mimetype } = file;
                let key = `user/${id}/${path}/${name}`;
                const { Location } = await uploadToS3(file, bucketName, key);
                rutaImagenPerfil = await updaterutaImagenPerfil(id, Location);
            });
            return buildContainer(true, '', rutaImagenPerfil, null)
        }
    } catch (error) {
        // util.controlError("uploadFile", error);
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
        // util.controlError("downloadFile", error);
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
    , updateUsuario
    , getTerminoyCondiciones
}