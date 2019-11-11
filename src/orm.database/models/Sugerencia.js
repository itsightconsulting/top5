import { agregarCamposBaseAuditoria } from '../../utilitarios/utilitarios';
function CreateFieldObj(_dataTypes) {
    let objEntidad = {
        descripcion: {
            type: _dataTypes.STRING(500),
            allowNull: false,
        }
    };

    objEntidad = agregarCamposBaseAuditoria(objEntidad, _dataTypes);
    return objEntidad;
}

export default (sequelize, DataTypes) => {
    const Sugerencia = sequelize.define(
        'Sugerencia'
        , CreateFieldObj(DataTypes)
        , { /*options*/
            // timestamps: false,
            freezeTableName: true,
        });

    Sugerencia.associate = function (models) {
        // associations can be defined here
    };
    return Sugerencia;
};
