import { agregarCamposBase } from '../../utilitarios/utilitarios';
function CreateFieldObj(_dataTypes) {
    let objEntidad = {
        rutaImagen: {
            type: _dataTypes.STRING(500),
            allowNull: true,
        },
        flagImagenDefaultTop: {
            type: _dataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    };

    objEntidad = agregarCamposBase(objEntidad, _dataTypes);
    return objEntidad;
}

export default (sequelize, DataTypes) => {
    const TopItemDetalle = sequelize.define(
        'TopItemDetalle'
        , CreateFieldObj(DataTypes)
        , { /*options*/
<<<<<<< HEAD
            timestamps: false,
=======
            // timestamps: false
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
            freezeTableName: true,
        });

    TopItemDetalle.associate = function (models) {
        // associations can be defined here
        // TopDetalle.belongsTo(models.Top);
    };
    return TopItemDetalle;
};
