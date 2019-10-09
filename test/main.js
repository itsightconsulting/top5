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
                NombreCompleto: 'diego alonso',
                CorreoElectronico: 'alonso11@gmail.com',
                Contrasenia: '$2b$10$gtOqrDpA0TVxb84Wgrpy2ebN47TkmcgT9u1vpEHvWKRErRphL7KZO',
                TipoUsuarioId: 1,
                RutaImagenPerfil: 'https://itsight-top5-bucket-user.s3.us-east-2.amazonaws.com/user/1/photo-profile/f862454c-a635-4c34-988d-d18a29f7d5a4.jpg'
            }
            , {
                NombreCompleto: '',
                CorreoElectronico: 'diego11498@hotmail.com',
                Contrasenia: '',
                TipoUsuarioId: 2,
                RutaImagenPerfil: 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=2533582986706998&height=200&width=200&ext=1572799546&hash=AeQLI4MCsraJMZJZ'
            },
            {
                NombreCompleto: 'Valeria',
                CorreoElectronico: 'valeria@gmail.com',
                Contrasenia: '$2b$10$Eoc1pn4sBpLguZVzjEpXP.t.HHeqEJ0hf1AslZ90RFB9cs7m/V8gO',
                TipoUsuarioId: 1,
                RutaImagenPerfil: ''
            },
            {
                NombreCompleto: '',
                CorreoElectronico: 'oniichan77@hotmail.com',
                Contrasenia: '',
                TipoUsuarioId: 2,
                RutaImagenPerfil: ''
            },
            {
                NombreCompleto: 'Valeria Romina',
                CorreoElectronico: 'valeria@hotmail.com',
                Contrasenia: '$2b$10$JujbJrtWnpXzn/LRvdsXE.ns4uSbLguNe.za.F2Y/sw9AIxpThmhy',
                TipoUsuarioId: 1,
                RutaImagenPerfil: ''
            },
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
            },
            {
                NombreCompleto: '',
                CorreoElectronico: 'valeria_romina3@hotmail.com',
                Contrasenia: '',
                TipoUsuarioId: 2,
                RutaImagenPerfil: 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=2518862691505120&height=200&width=200&ext=1572737967&hash=AeQKCYUXYYpS9FSH'
            }];

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