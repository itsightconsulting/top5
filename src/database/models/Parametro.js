import { agregarCamposBase } from '../../utilitarios/utilitarios';
function CreateFieldObj(_dataTypes) {
    let objEntidad = {
        ParametroId: {
            type: _dataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        Codigo: {
            type: _dataTypes.STRING(500),
            allowNull: false,
        },
        Valor: {
            type: _dataTypes.STRING(500),
            allowNull: false,
        }
    };

    objEntidad = agregarCamposBase(objEntidad, _dataTypes);
    return objEntidad;
}

export default (sequelize, DataTypes) => {
    const Parametro = sequelize.define(
        'Parametro'
        , CreateFieldObj(DataTypes)
        , { /*options*/
            timestamps: false
        });

    return Parametro;
};
