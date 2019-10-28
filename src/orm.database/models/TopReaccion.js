import { agregarCamposBase } from '../../utilitarios/utilitarios';
function CreateFieldObj(_dataTypes) {
    let objEntidad = {
        // TopReaccionId: {
        //     type: _dataTypes.INTEGER,
        //     allowNull: false,
        //     autoIncrement: true,
        //     primaryKey: true
        // },
        // TopId: {
        //     type: _dataTypes.INTEGER,
        //     allowNull: false,
        // },
        // UsuarioId: {
        //     type: _dataTypes.INTEGER,
        //     allowNull: false,
        // }
    };

    objEntidad = agregarCamposBase(objEntidad, _dataTypes);
    return objEntidad;
}

export default (sequelize, DataTypes) => {
    const TopReaccion = sequelize.define(
        'TopReaccion'
        , CreateFieldObj(DataTypes)
        , { /*options*/
            // timestamps: false
            freezeTableName: true,
        });

    TopReaccion.associate = function (models) {
        // associations can be defined here
    };
    return TopReaccion;
};
