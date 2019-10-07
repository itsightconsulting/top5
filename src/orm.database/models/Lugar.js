import { agregarCamposBase } from '../../utilitarios/utilitarios';
function CreateFieldObj(_dataTypes) {
    let objEntidad = {
        LugarId: {
            type: _dataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        Nombre: {
            type: _dataTypes.STRING(200),
            allowNull: false,
        },
        Latitud: {
            type: _dataTypes.STRING(200),
            allowNull: false,
        },
        Longitud: {
            type: _dataTypes.STRING(200),
            allowNull: false,
        },
        Tipo: {
            type: _dataTypes.STRING(200),
            allowNull: false,
        },
        FlagProcedenciaGoogleMaps: {
            type: _dataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    };

    objEntidad = agregarCamposBase(objEntidad, _dataTypes);
    return objEntidad;
}

export default (sequelize, DataTypes) => {
    const Lugar = sequelize.define(
        'Lugar'
        , CreateFieldObj(DataTypes)
        , { /*options*/
            timestamps: false
        });

    Lugar.associate = function (models) {
        // associations can be defined here
    };
    return Lugar;
};
