import authService from "../security/AuthService";
import UsuarioDTO from "../models/usuario";
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function login(req, res) {
    const { id, data, token } = req.body;
    try {
        if (data === null || data === undefined) { return res.status(500).send(buildContainer(false, 'Cuerpo JSON "data" no esta definido.', null, null)); }

        const { CorreoElectronico, Contrasenia, FechaCreacion } = data;
        const usuario = await UsuarioDTO.findOne({
            where: {
                CorreoElectronico: CorreoElectronico.toLowerCase()
            }
        }, {
                fields: ['NombreCompleto', 'CorreoElectronico', 'Username', 'FechaCreacion']
            });
        if (usuario === null) {
            return res.status(401).send(buildContainer(false, 'Email incorrecto.', null, null));
        }
        var passwordIsValid = bcrypt.compareSync(Contrasenia, usuario.Contrasenia);
        if (!passwordIsValid) return res.status(401).send(buildContainer(false, 'Contraseña incorrecto.', null, null));

        let objToken = ObjectToken(usuario);
        let token = await authService.generateToken(objToken);

        res.send({
            ok: true
            , data: usuario
            , token: token
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(buildContainer(false, 'Sucedio un error inesperado vuelva a intentar.', null, null));
    }
}
function cerrarSession() {
    res.status(200).json(buildContainer(true, 'Correcto.', null, null));
}

function ObjectToken(usuario) {
    return {
        username: usuario.Username
        , id: usuario.UsuarioId
    }
}
async function relogin(req, res) {
    try {
        const { username, id } = req.body;
        let objToken = {
            username: username,
            id: id
        }
        let newToken = await authService.generateToken(objToken);

        var rpta = await UsuarioDTO.findOne({ where: { usuarioId: id } });
        if (rpta === null)
            res.send({ ok: false, message: "No existe el usuario" });
        else
            res.send({ ok: true, data: rpta, token: newToken });

    } catch (err) {
        console.log(err);
        res.status(500).json(buildContainer(false, 'Sucedio un error inesperado vuelva a intentar.', null, null));
    }
}

async function crearUsuario(req, res) {
    const { id, data, token } = req.body;
    try {
        if (data === null || data === undefined) { return res.status(500).send(buildContainer(false, "Cuerpo JSON 'data' no esta definido.", null, null)); }
        const { NombreCompleto, CorreoElectronico, Username, Contrasenia, FlagActivo, FlagEliminado, FechaCreacion } = data;

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

            let token = await authService.generateToken({ CorreoElectronico: newUsuario.CorreoElectronico, Contrasenia: newUsuario.Contrasenia });

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
    updateUsuario,
    cerrarSession
}