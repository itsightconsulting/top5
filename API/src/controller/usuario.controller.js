import authService from "../security/AuthService";
import UsuarioDTO from "../models/usuario";
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';


async function login(req, res) {
    const { id, data, token } = req.body;
    const { CorreoElectronico, Contrasenia, FechaCreacion } = data;
    try {

        const usuario = await UsuarioDTO.findOne({
            where: {
                CorreoElectronico: CorreoElectronico.toLowerCase()
            }
        });
        if (usuario == null) {
            res.send(buildContainer(false, 'Nombre de usuario incorrecto.', null, null));
            return
        }

        bcrypt.compare(contrasenia, usuario.contrasenia, function (err, valid) {
            if (!valid) {
                return res.send();
            }

            let objToken = {
                username: usuario.Username
                , id: usuario.UsuarioId
            }

            let token = authService.generateToken(objToken);

            res.send({
                ok: true
                , data: user
                , token: token
            });
        });
    } catch (err) {
        res.status(500).json(buildContainer(false, 'Sucedio un error inesperado vuelva a intentar.', null, null));
    }
}

async function relogin(req, res) {
    try {
        const { username, id } = req.body;
        let objToken = {
            username: username,
            id: id
        }
        let newToken = authService.generateToken(objToken);

        var rpta = await UsuarioDTO.findOne({ where: { usuarioId: id } });
        if (rpta === null)
            res.send({ ok: false, message: "No existe el usuario" });
        else
            res.send({ ok: true, data: rpta, token: newToken });

    } catch (err) {
        res.status(500).json(buildContainer(false, 'Sucedio un error inesperado vuelva a intentar.', null, null));
    }
}

async function crearUsuario(req, res) {
    const { id, data, token } = req.body;
    const { NombreCompleto, CorreoElectronico, Username, Contrasenia, FlagActivo, FlagEliminado, FechaCreacion } = data;
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        let ContraseniaEncrypt = await bcrypt.hash(Contrasenia, salt);
        let newUsuario = await UsuarioDTO.create({
            NombreCompleto
            , CorreoElectronico
            , Username
            , Contrasenia: ContraseniaEncrypt
            , FlagActivo
            , FlagEliminado
            , FechaCreacion
        }, {
                fields: ['NombreCompleto', 'CorreoElectronico', 'Username', 'Contrasenia', 'FlagActivo', 'FlagEliminado', 'FechaCreacion']
            });
        if (newUsuario) {

            let token = authService.generateToken({ CorreoElectronico: newUsuario.CorreoElectronico, Contrasenia: newUsuario.Contrasenia });

            return res.json(buildContainer(true, 'Usuario creado correctamente.', newUsuario, token));
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(buildContainer(false, 'Sucedio un error inesperado vuelva a intentar.', null, null));
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
        res.status(200).json({
            data: usuario
        });
    } catch (err) {
        console.log("error: ", err);
        res.status(500).json(buildContainer(false, 'Sucedio un error inesperado vuelva a intentar.', null, null));
    }
}


async function updateUsuario(req, res) {
    const { id } = req.params;
    const { Nombres, Apellidos, CorreoElectronico, Username, Contrasenia } = req.body;

    const usuario = await UsuarioDTO.findOne({
        attributter: ['Nombres', 'Apellidos', 'CorreoElectronico', 'Username', 'Contrasenia']
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
    return res.json({
        message: 'Actualizado correctamente.',
        data: usuario
    })
}

module.exports = {
    login,
    relogin,
    crearUsuario,
    getOneUsuario,
    updateUsuario
}