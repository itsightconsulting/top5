import { agregarCamposBaseAuditoria } from '../../utilitarios/utilitarios';
function CreateFieldObj(_dataTypes) {
    let objEntidad = {
        // tipoUsuarioId: {
        //     type: _dataTypes.INTEGER,
        //     allowNull: false,
        //     autoIncrement: true,
        //     primaryKey: true
        // },
        name: {
            type: _dataTypes.STRING(200),
            allowNull: false,
        }
    };

    objEntidad = agregarCamposBaseAuditoria(objEntidad, _dataTypes);
    return objEntidad;
}

export default (sequelize, DataTypes) => {
    const TipoUsuario = sequelize.define(
        'TipoUsuario'
        , CreateFieldObj(DataTypes)
        , { /*options*/
<<<<<<< HEAD
            timestamps: false,
=======
            // timestamps: false
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
            freezeTableName: true,
        });

    TipoUsuario.associate = function (models) {
        // associations can be defined here
        TipoUsuario.hasMany(models.Usuario);
    };
    return TipoUsuario;
};
