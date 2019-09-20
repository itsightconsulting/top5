import models from '../src/database/database';
import { get_Date } from '../src/utilitarios/utilitarios';
const TipoUsuarioDTO = models.TipoUsuario;
async function Init() {
    try {
        // await SincronizarModelo();
        await dataInit();
    } catch (err) {
        console.error('Init ERROR:', err);
    }
}

async function SincronizarModelo() {
    try {
        // Note: using `force: true` will drop the table if it already exists
        console.log("SincronizarModelo", models);
        const rpta = await models.sequelize.sync({ force: true });
        console.log(rpta);
    } catch (err) {
        console.error('ERROR ObtenerUsuario:', err);
    }
}


async function dataInit() {
    try {
        let array = ['Top5', 'Facebook', 'Instagram'];
        array.forEach(async element => {
            let newTipoUsuario = await TipoUsuarioDTO.create({
                Nombre: element
                , FlagActivo: true
                , FlagEliminado: false
                , FechaCreacion: get_Date()
                , CreadoPor: 'AUTO'
            }, {
                    fields: ['Nombre', 'FlagActivo', 'FlagEliminado', 'FechaCreacion', 'CreadoPor']
                });
        });

    } catch (err) {
        console.log("dataInit error: ", err);
    }
}

Init();