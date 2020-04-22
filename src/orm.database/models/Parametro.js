import { agregarCamposBaseAuditoria } from '../../utilitarios/utilitarios';
function CreateFieldObj(_dataTypes) {
    let objEntidad = {
        // ParametroId: {
        //     type: _dataTypes.INTEGER,
        //     allowNull: false,
        //     autoIncrement: true,
        //     primaryKey: true
        // },
        code: {
            type: _dataTypes.STRING(500),
            allowNull: false,
        },
        value: {
            type: _dataTypes.STRING(500),
            allowNull: false,
        }
    };

    objEntidad = agregarCamposBaseAuditoria(objEntidad, _dataTypes);
    return objEntidad;
}

export default (sequelize, DataTypes) => {
    const Parametro = sequelize.define(
        'Parametro'
        , CreateFieldObj(DataTypes)
        , { /*options*/
<<<<<<< HEAD
            timestamps: false,
=======
            // timestamps: false,
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
            freezeTableName: true,
        });

    Parametro.associate = function (models) {
        // associations can be defined here
    };
    return Parametro;
};
