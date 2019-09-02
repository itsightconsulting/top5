import authService from "../security/AuthService";
import UsuarioDTO from "../models/usuario";
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';


async function login(req, res) {
    try {
        const { username, contrasenia } = req.body;
        const usuario = await UsuarioDTO.findOne({
            where: {
                username: username.toLowerCase()
            }
        });
        if (usuario == null) {
            res.send({
                ok: false
                , message: "Nombre de usuario incorrecto."
                , data: []
            });
            return
        }

        bcrypt.compare(contrasenia, usuario.contrasenia, function (err, valid) {
            if (!valid) {
                return res.send({
                    ok: false
                    , message: 'Contraseña incorrecto.'
                });
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
        res.status(500).json({
            message: 'Sucedio un error inesperado vuelva a intentar.',
            data: {}
        });
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
        res.status(500).json({
            message: 'Sucedio un error inesperado vuelva a intentar.',
            data: {}
        });
    }
}

async function crearUsuario(req, res) {
    // const { id, data, token } = req.body;
    // console.log(id, data, token);
    const { NombreCompleto, CorreoElectronico, Username, Contrasenia, FlagActivo, FlagEliminado, FechaCreacion } = req.body;
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        Contrasenia = await bcrypt.hash(Contrasenia, salt);

        let newUsuario = await UsuarioDTO.create({
            NombreCompleto
            , CorreoElectronico
            , Username
            , Contrasenia
            , FlagActivo
            , FlagEliminado
            , FechaCreacion
        }, {
                fields: ['NombreCompleto', 'CorreoElectronico', 'Username', 'Contrasenia', 'FlagActivo', 'FlagEliminado', 'FechaCreacion']
            });
        if (newUsuario) {
            return res.json({
                message: 'Usuario creado correctamente.',
                data: newUsuario
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Sucedio un error inesperado vuelva a intentar.',
            data: {}
        });
    }
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
        res.status(500).json({
            message: 'Sucedio un error inesperado vuelva a intentar.',
            data: {}
        });
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