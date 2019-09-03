import UsuarioDTO from "../src/models/usuario";
import { sequelize } from '../src/database/database';

function Init() {
    try {
        sequelize.authenticate()
            .then(() => { console.log('Connection has been established successfully.'); })
            .catch(err => { console.error('ERROR AbrirConexion:', err); });

    } catch (err) {
        console.error('ERROR ObtenerUsuario:', err);
    }
}

function SincronizarModelo() {
    // Note: using `force: true` will drop the table if it already exists
    sequelize.sync({ force: true })
        .then(() => { console.log("SincronizarModelo", "ok"); })
        .catch(err => { console.error('ERROR SincronizarModelo:', err); });
}


async function getOneUsuario(id) {
    try {
        console.log("id", id);
        const usuario = await UsuarioDTO.findOne({
            where: {
                UsuarioId: id
            }
        });
        console.log("usuario.dataValues", usuario);
        return usuario;
    } catch (err) {
        console.log("error: ", err);
        return err;
    }
}
