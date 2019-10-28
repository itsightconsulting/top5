import { agregarCamposBase } from '../../utilitarios/utilitarios';
function CreateFieldObj(_dataTypes) {
    let objEntidad = {
        // UsuarioSeguidorId: {
        //     type: _dataTypes.INTEGER,
        //     allowNull: false,
        //     autoIncrement: true,
        //     primaryKey: true
        // },
        // UsuarioId: {
        //     type: _dataTypes.INTEGER,
        //     allowNull: false,
        // },
        // SiguiendoAUsuarioId: {
        //     type: _dataTypes.INTEGER,
        //     allowNull: false,
        // },
    };

    objEntidad = agregarCamposBase(objEntidad, _dataTypes);
    return objEntidad;
}

export default (sequelize, DataTypes) => {
    const UsuarioSeguidor = sequelize.define(
        'UsuarioSeguidor'
        , CreateFieldObj(DataTypes)
        , { /*options*/
            // timestamps: false
            freezeTableName: true,
        });

    UsuarioSeguidor.associate = function (models) {
        // associations can be defined here
        UsuarioSeguidor.belongsTo(models.Usuario, { as: 'UsuarioId' });
        UsuarioSeguidor.belongsTo(models.Usuario, { as: 'siguiendoAUsuarioId' });
    };
    return UsuarioSeguidor;
};
