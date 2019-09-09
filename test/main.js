// import UsuarioDTO from "../src/models/usuario";
// import { sequelize } from '../src/database/database';
import models from '../src/database/database';
function Init() {
    try {
        // sequelize.authenticate()
        //     .then(() => { console.log('Connection has been established successfully.'); })
        //     .catch(err => { console.error('ERROR AbrirConexion:', err); });

    } catch (err) {
        console.error('ERROR ObtenerUsuario:', err);
    }
}

async function SincronizarModelo() {
    // Note: using `force: true` will drop the table if it already exists
    try {
        console.log("SincronizarModelo", models);
        const rpta = await models.sequelize.sync({ force: true });
        console.log(rpta);
        // .then(() => { console.log("SincronizarModelo", "ok"); })
        // .catch(err => { console.error('ERROR SincronizarModelo:', err); });
    } catch (err) {
        console.error('ERROR ObtenerUsuario:', err);
    }
}


async function getOneUsuario(id) {
    try {
        console.log("id", id);
        // const usuario = await UsuarioDTO.findOne({
        //     where: {
        //         UsuarioId: id
        //     }
        // });
        // console.log("usuario.dataValues", usuario);
        // return usuario;
    } catch (err) {
        console.log("error: ", err);
        return err;
    }
}

SincronizarModelo();