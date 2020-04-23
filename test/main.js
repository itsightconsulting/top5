import models from '../src/orm.database/models/index';
async function Init() {
    try {
        // var fec_moment = "2019-10-31 16:37:52.99+00";
        // let millon = 10e6;
        // console.log(rpta);
        await SincronizarModelo();
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
        console.error('ERROR SincronizarModelo:', err);
    }
}
Init();