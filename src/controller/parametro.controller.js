import models from '../orm.database/models/index';
const ParametroDTO = models.Parametro;
async function obtenerParametro(codigo) {
    try {
        const parametro = await ParametroDTO.findOne({
            where: {
                code: codigo,
                flagActive: true
            }, attributes: ['value']
        });
        return parametro;
    } catch (err) {
        throw new Error("obtenerParametro(error) " + err);
    }
}

module.exports = {
    obtenerParametro
}
