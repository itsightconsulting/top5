import models from '../database/database';
const ParametroDTO = models.Parametro;
async function obtenerParametro(codigo) {
    try {
        const parametro = await ParametroDTO.findOne({
            where: {
                Codigo: codigo.toLowerCase(),
                FlagActivo: true
            }, attributes: ['Valor']
        });
        return parametro;
    } catch (err) {
        throw new Error("obtenerParametro(error) " + err);
    }
}

module.exports = {
    obtenerParametro
}
