import models from '../src/orm.database/models/index';
import { get_Date } from '../src/utilitarios/utilitarios';
const UsuarioDTO = models.Usuario;
async function Init() {
    try {
        await SincronizarModelo();
        // await createInitUsuario();
    } catch (err) {
        console.error('Init ERROR:', err);
    }
}
async function SincronizarModelo() {
    try {
        // Note: using `force: true` will drop the table if it already exists
        // const rpta = await models.sequelize.sync({ force: true });
        const rpta = await models.sequelize.sync({ alter: true });
        console.log("SincronizarModelo ok");
    } catch (err) {
        console.error('ERROR ObtenerUsuario:', err);
    }
}
async function createInitUsuario() {
    try {
        let arrayUsuario = [
            {
                NombreCompleto: 'Amy',
                CorreoElectronico: 'amy@easyadd.pe',
                Contrasenia: '$2b$10$EH3XmTuDg/Hi1zYLWzvxr.3EupoLGJwpREtsRK20.eDdE.pPkBF7e',
                TipoUsuarioId: 1,
                RutaImagenPerfil: ''
            },
            {
                NombreCompleto: 'Top cinco',
                CorreoElectronico: 'top5app@hotmail.com',
                Contrasenia: '$2b$10$SD95OYfBIo1NinWWtwWRgO3Z7WG1mm96..RRLMmJ08rZw00SCKd8q',
                TipoUsuarioId: 1,
                RutaImagenPerfil: ''
            }
        ];

        arrayUsuario.forEach(async element => {
            let newUsuario = await UsuarioDTO.create({
                NombreCompleto: element.NombreCompleto
                , CorreoElectronico: element.CorreoElectronico
                , Contrasenia: element.Contrasenia
                , TipoUsuarioId: element.TipoUsuarioId
                , RutaImagenPerfil: element.RutaImagenPerfil
                , FlagActivo: true
                , FlagEliminado: false
                , FechaCreacion: get_Date()
                , CreadoPor: 'AUTO'
            }, {
                fields: ['NombreCompleto', 'CorreoElectronico', 'Contrasenia', 'TipoUsuarioId', 'RutaImagenPerfil', 'FlagActivo', 'FlagEliminado', 'FechaCreacion', 'CreadoPor']
            });
        });
    } catch (error) {
        throw error;
    }
}
Init();