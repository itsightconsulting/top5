import models from '../src/database/database';
import { get_Date } from '../src/utilitarios/utilitarios';
import { encryptAES256ctr, decryptedAES256ctr } from '../src/controller/common.controller';
import Usuario from '../src/models/Usuario';
const TipoUsuarioDTO = models.TipoUsuario;
const ParametroDTO = models.Parametro;
const UsuarioDTO = models.Usuario;
async function Init() {
    try {
        // await SincronizarModelo();
        // await createInitTipoUsuario();
        // await createInitUsuario();
        // await createInitParametro();
    } catch (err) {
        console.error('Init ERROR:', err);
    }
}
async function SincronizarModelo() {
    try {
        // Note: using `force: true` will drop the table if it already exists
        const rpta = await models.sequelize.sync({ force: true });
    } catch (err) {
        console.error('ERROR ObtenerUsuario:', err);
    }
}
async function createInitParametro() {
    try {
        // let arrayParametro = [
        //     {
        //         Codigo: 'AWS_ACCESS_KEY_ID',
        //         Valor: AWS_ACCESS_KEY_IDEncrypt
        //     }
        //     , {
        //         Codigo: 'AWS_SECRET_ACCESS_KEY',
        //         Valor: AWS_SECRET_ACCESS_KEYEncrypt
        //     }];
        // arrayParametro.forEach(async element => {
        //     let newParametro = await ParametroDTO.create({
        //         Codigo: element.Codigo
        //         , Valor: element.Valor
        //         , FlagActivo: true
        //         , FlagEliminado: false
        //         , FechaCreacion: get_Date()
        //         , CreadoPor: 'AUTO'
        //     }, {
        //         fields: ['Codigo', 'Valor', 'FlagActivo', 'FlagEliminado', 'FechaCreacion', 'CreadoPor']
        //     });
        // });
    } catch (error) {
        throw error;
    }
}
async function createInitTipoUsuario() {
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
    } catch (error) {
        throw error
    }
}
async function createInitUsuario() {
    try {
        let arrayUsuario = [
            {
                NombreCompleto: 'diego alonso',
                CorreoElectronico: 'alonso11@gmail.com',
                Contrasenia: '$2b$10$gtOqrDpA0TVxb84Wgrpy2ebN47TkmcgT9u1vpEHvWKRErRphL7KZO',
                TipoUsuarioId: 1
            }
            , {
                NombreCompleto: '',
                CorreoElectronico: 'diego11498@hotmail.com',
                Contrasenia: '',
                TipoUsuarioId: 2
            },
            {
                NombreCompleto: 'Valeria',
                CorreoElectronico: 'valeria@gmail.com',
                Contrasenia: '$2b$10$Eoc1pn4sBpLguZVzjEpXP.t.HHeqEJ0hf1AslZ90RFB9cs7m/V8gO',
                TipoUsuarioId: 1
            },
            {
                NombreCompleto: '',
                CorreoElectronico: 'oniichan77@hotmail.com',
                Contrasenia: '',
                TipoUsuarioId: 2
            },
            {
                NombreCompleto: 'Valeria Romina',
                CorreoElectronico: 'valeria@hotmail.com',
                Contrasenia: '$2b$10$JujbJrtWnpXzn/LRvdsXE.ns4uSbLguNe.za.F2Y/sw9AIxpThmhy',
                TipoUsuarioId: 1
            }];

        arrayUsuario.forEach(async element => {
            let newUsuario = await UsuarioDTO.create({
                NombreCompleto: element.NombreCompleto
                , CorreoElectronico: element.CorreoElectronico
                , Contrasenia: element.Contrasenia
                , TipoUsuarioId: element.TipoUsuarioId
                , FlagActivo: true
                , FlagEliminado: false
                , FechaCreacion: get_Date()
                , CreadoPor: 'AUTO'
            }, {
                fields: ['NombreCompleto', 'CorreoElectronico', 'Contrasenia', 'TipoUsuarioId', 'FlagActivo', 'FlagEliminado', 'FechaCreacion', 'CreadoPor']
            });
        });
    } catch (error) {
        throw error;
    }
}
Init();