import { agregarCamposBaseAuditoria } from '../../utilitarios/utilitarios';
function CreateFieldObj(_dataTypes) {
    let objEntidad = {
        // lugarId: {
        //     type: _dataTypes.INTEGER,
        //     allowNull: false,
        //     autoIncrement: true,
        //     primaryKey: true
        // },
        name: {
            type: _dataTypes.STRING(200),
            allowNull: false,
        },
        latitude: {
            type: _dataTypes.STRING(200),
            allowNull: false,
        },
        longitude: {
            type: _dataTypes.STRING(200),
            allowNull: false,
        },
        // tipo: {
        //     type: _dataTypes.STRING(200),
        //     allowNull: false,
        // },
        // flagNuevoEnGoogleMaps: {
        //     type: _dataTypes.BOOLEAN,
        //     allowNull: false,
        //     defaultValue: false
        // }
    };

    objEntidad = agregarCamposBaseAuditoria(objEntidad, _dataTypes);
    return objEntidad;
}

export default (sequelize, DataTypes) => {
    const Lugar = sequelize.define(
        'Lugar'
        , CreateFieldObj(DataTypes)
        , { /*options*/
            // timestamps: false
            freezeTableName: true,
        });

    Lugar.associate = function (models) {
        // associations can be defined here
        Lugar.hasMany(models.TopItem);
    };
    return Lugar;
};
