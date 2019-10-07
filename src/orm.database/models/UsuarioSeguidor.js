import { agregarCamposBase } from '../../utilitarios/utilitarios';
function CreateFieldObj(_dataTypes) {
    let objEntidad = {
        UsuarioSeguidorId: {
            type: _dataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        UsuarioId: {
            type: _dataTypes.STRING(200),
            allowNull: false,
        },
        UsuarioAsociadoId: {
            type: _dataTypes.STRING(200),
            allowNull: false,
        },
    };

    objEntidad = agregarCamposBase(objEntidad, _dataTypes);
    return objEntidad;
}

export default (sequelize, DataTypes) => {
    const UsuarioSeguidor = sequelize.define(
        'UsuarioSeguidor'
        , CreateFieldObj(DataTypes)
        , { /*options*/
            timestamps: false
        });

    UsuarioSeguidor.associate = function (models) {
        // associations can be defined here
    };
    return UsuarioSeguidor;
};
